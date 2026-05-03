"use client";


import { useState, KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddPrincipleFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function AddPrincipleForm({ onSuccess, className }: AddPrincipleFormProps) {
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const addTag = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Content is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/principles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          source: source.trim() || null,
          tags,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to add principle.");
      }

      setContent("");
      setSource("");
      setTags([]);
      setTagInput("");

      toast.success("Principle added");

      onSuccess?.();
    } catch (err) {
      toast.error("Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5",
        className
      )}
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Add a Principle</h2>
        <p className="text-sm text-muted-foreground">
          Record a guiding principle, its source, and relevant tags.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">
          Content <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="content"
          placeholder="Write the principle here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Source */}
      <div className="space-y-2">
        <Label htmlFor="source">Source</Label>
        <Input
          id="source"
          placeholder="e.g. Meditations by Marcus Aurelius"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div
          className={cn(
            "flex flex-wrap items-center gap-1.5 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
          )}
        >
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1 pr-1">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
                aria-label={`Remove tag ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <input
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={() => tagInput.trim() && addTag(tagInput)}
            placeholder={tags.length === 0 ? "Add tags (press Enter or comma)" : ""}
            className="flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground"
          />
          {tagInput.trim() && (
            <button
              type="button"
              onClick={() => addTag(tagInput)}
              className="flex items-center justify-center rounded-full h-5 w-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Add tag"
            >
              <Plus className="h-3 w-3" />
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Press <kbd className="font-mono bg-muted px-1 rounded">Enter</kbd> or{" "}
          <kbd className="font-mono bg-muted px-1 rounded">,</kbd> to add a tag.
        </p>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving…
          </>
        ) : (
          "Add Principle"
        )}
      </Button>
    </form>
  );
}