"use client";

import { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { apiRequest } from "@/helpers/apiRequest";
import { toast } from "sonner";

const GetHelpModal = ({ profile, setOpen }: any) => {
  // const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Sending help request...", { id: "help" });
    const payload = {
      email: profile?.email,
      message: description,
    };

    try {
      const res = await apiRequest("/help/create", {
        method: "POST",
        body: payload,
      });
      if (res?.success) {
        toast.success("Help request sent successfully", { id: "help" });
        setDescription("");
        setOpen(false);
      } else {
        toast.error(res?.message, { id: "help" });
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <DialogContent className="sm:max-w-sm p-6 rounded-3xl">
      <h1 className="text-xl font-semibold mb-4 text-[#002913]">Get help</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-sm text-muted-foreground"
          >
            How can we help?
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] resize-none rounded-xl"
          />
        </div>

        <DialogFooter className="flex justify-center items-center gap-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="px-4 bg-bg flex-1 border-border-color hover:bg-bg text-dark-primary hover:text-dark-primary h-11 cursor-pointer text-sm font-semibold rounded-2xl"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="secondary"
            className="bg-dark-primary flex-1 h-12 px-4 text-sm font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl cursor-pointer"
            disabled={!description.trim()}
          >
            Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default GetHelpModal;
