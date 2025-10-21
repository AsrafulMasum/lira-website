"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, FileText } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/app/loading";
import {
  useAddSettingsMutation,
  useGetSettingsQuery,
} from "@/redux/apiSlices/publicSlice";

const ManagePrivacy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { data: getSettingsData, isLoading } =
    useGetSettingsQuery("privacyPolicy");

  const [updatePrivacy] = useAddSettingsMutation();

  // JoditEditor configuration
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter your privacy policy content here...",
      height: 500,
      toolbar: true,
      spellcheck: true,
      language: "en",
      toolbarButtonSize: "middle",
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "paragraph",
        "align",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "link",
        "table",
        "|",
        "fullsize",
        "source",
      ],
    }),
    []
  );

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const privacyPolicy = getSettingsData?.data || "";
  console.log(privacyPolicy);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setHasUnsavedChanges(newContent !== privacyPolicy);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePrivacy({
        privacyPolicy: content || privacyPolicy,
      }).unwrap();

      // Update the content state to reflect the saved content
      setContent(content || privacyPolicy);
      setHasUnsavedChanges(false);
      toast.success("Privacy policy saved successfully!");
    } catch (error: any) {
      console.error("Failed to save privacy policy:", error);
      toast.error("Failed to save privacy policy. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Privacy Policy Management
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage your website&apos;s privacy policy
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <Badge
              variant="outline"
              className="text-orange-600 border-orange-200"
            >
              Unsaved Changes
            </Badge>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Editor Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Privacy Policy Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <JoditEditor
              ref={editor}
              value={content || privacyPolicy}
              config={config as any}
              tabIndex={1}
              onBlur={handleContentChange}
              onChange={() => {}} // Using onBlur for performance
            />
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>
              <strong>Tip:</strong> Use the toolbar above to format your
              content. Changes are automatically detected and you&apos;ll see an
              &quot;Unsaved Changes&quot; badge when modifications are made.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagePrivacy;
