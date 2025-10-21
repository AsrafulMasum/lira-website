"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, HelpCircle } from "lucide-react";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

const ManageFaqPage = () => {
  // State management
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button and fill in your details including email, password, and personal information.",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      question: "How can I reset my password?",
      answer:
        "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions sent to your email.",
      createdAt: "2024-01-16",
      updatedAt: "2024-01-16",
    },
    {
      id: "3",
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your consent.",
      createdAt: "2024-01-17",
      updatedAt: "2024-01-17",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [deletingFaqId, setDeletingFaqId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Open modal for adding new FAQ
  const handleAddFaq = () => {
    setEditingFaq(null);
    setFormData({ question: "", answer: "" });
    setIsModalOpen(true);
  };

  // Open modal for editing existing FAQ
  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
    });
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Please fill in both question and answer fields");
      return;
    }

    if (editingFaq) {
      // Update existing FAQ
      setFaqs((prev) =>
        prev.map((faq) =>
          faq.id === editingFaq.id
            ? {
                ...faq,
                question: formData.question,
                answer: formData.answer,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : faq
        )
      );
      toast.success("FAQ updated successfully!");
    } else {
      // Add new FAQ
      const newFaq: FAQ = {
        id: Date.now().toString(),
        question: formData.question,
        answer: formData.answer,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setFaqs((prev) => [newFaq, ...prev]);
      toast.success("FAQ added successfully!");
    }

    setIsModalOpen(false);
    setFormData({ question: "", answer: "" });
    setEditingFaq(null);
  };

  // Handle delete confirmation
  const handleDeleteClick = (faqId: string) => {
    setDeletingFaqId(faqId);
    setIsDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (deletingFaqId) {
      setFaqs((prev) => prev.filter((faq) => faq.id !== deletingFaqId));
      toast.success("FAQ deleted successfully!");
    }
    setIsDeleteDialogOpen(false);
    setDeletingFaqId(null);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <HelpCircle className="w-8 h-8 text-green-600" />
              Manage FAQs
            </h1>
            <p className="text-gray-600 mt-2">
              Create and manage frequently asked questions to help your users
              find answers quickly.
            </p>
          </div>
          <Button
            onClick={handleAddFaq}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Total FAQs: {faqs.length}
          </Badge>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No FAQs yet
              </h3>
              <p className="text-gray-600 mb-4">
                Get started by adding your first frequently asked question.
              </p>
              <Button
                onClick={handleAddFaq}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First FAQ
              </Button>
            </CardContent>
          </Card>
        ) : (
          faqs.map((faq, index) => (
            <Card
              key={faq.id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 mb-2">
                      Q{index + 1}: {faq.question}
                    </CardTitle>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditFaq(faq)}
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(faq.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Created: {faq.createdAt}</span>
                  {faq.updatedAt !== faq.createdAt && (
                    <span>Updated: {faq.updatedAt}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit FAQ Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingFaq ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
            <DialogDescription>
              {editingFaq
                ? "Update the question and answer for this FAQ."
                : "Create a new frequently asked question and its answer."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                placeholder="Enter the frequently asked question..."
                value={formData.question}
                onChange={(e) => handleInputChange("question", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                placeholder="Enter the detailed answer..."
                value={formData.answer}
                onChange={(e) => handleInputChange("answer", e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {editingFaq ? "Update FAQ" : "Add FAQ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the FAQ
              and remove it from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageFaqPage;
