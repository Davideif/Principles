export type FormErrors = Partial<Record<"content" | "source" | "tags", string>>;

export function validatePrinciple(content: string, source: string, tags: string[]): FormErrors {
  const errors: FormErrors = {};

  if (!content.trim()) {
    errors.content = "Content is required.";
  } else if (content.trim().length < 10) {
    errors.content = "Content must be at least 10 characters.";
  } else if (content.trim().length > 1000) {
    errors.content = `Too long — ${content.trim().length}/1000 characters.`;
  }

  if (source.trim().length > 200) {
    errors.source = "Source must be under 200 characters.";
  }

  if (tags.length > 10) {
    errors.tags = "Maximum 10 tags allowed.";
  }

  return errors;
}