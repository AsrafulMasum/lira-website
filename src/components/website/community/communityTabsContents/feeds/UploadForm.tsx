"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/helpers/apiRequest";
import { revalidateTags } from "@/helpers/revalidateTags";
import { toast } from "sonner";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Posting idea...", { id: "createPost" });
    const payload = { title, description };
    try {
      const res = await apiRequest("/community/create", {
        method: "POST",
        body: payload,
      });
      if (res?.success) {
        revalidateTags(["posts"]);
        toast.success("Idea posted successfully", { id: "createPost" });
        setTitle("");
        setDescription("");
      } else {
        toast.error(res?.message, { id: "createPost" });
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.", {
        id: "createPost",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl">
      <h1 className="text-xl font-semibold mb-6 text-[#002913]">
        Suggest an idea
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm text-muted-foreground">
            Title/Question
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Predict the Bitcoin price on July 1 at 9:00 PM"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-sm text-muted-foreground"
          >
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Why do you think this is a great contest?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] resize-none rounded-xl"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="secondary"
            className="bg-dark-primary h-12 px-4 text-base font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl cursor-pointer"
            disabled={!title.trim() || !description.trim()}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
