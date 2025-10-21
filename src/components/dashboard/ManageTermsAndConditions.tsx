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
import {
  useAddSettingsMutation,
  useGetSettingsQuery,
} from "@/redux/apiSlices/publicSlice";
import Loading from "@/app/loading";

const ManageTermsAndConditions = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { data: getSettingsData, isLoading } =
    useGetSettingsQuery("termsOfService");

  const [updateTerms] = useAddSettingsMutation();

  // JoditEditor configuration
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter your terms and conditions content here...",
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

  const termsAndConditions = getSettingsData?.data || "";
  console.log(termsAndConditions);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setHasUnsavedChanges(newContent !== termsAndConditions);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateTerms({
        termsOfService: content || termsAndConditions,
      }).unwrap();

      // Update the content state to reflect the saved content
      setContent(content || termsAndConditions);
      setHasUnsavedChanges(false);
      toast.success("Terms and conditions saved successfully!");
    } catch (error: any) {
      console.error("Failed to save terms and conditions:", error);
      toast.error("Failed to save terms and conditions. Please try again.");
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
              Terms & Conditions Management
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage your website&apos;s terms and conditions
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
            Terms & Conditions Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <JoditEditor
              ref={editor}
              value={content || termsAndConditions}
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

export default ManageTermsAndConditions;
