export type LogErrors = Partial<Record<"text", string>>;

const MAX_CHARS = 1000;
const MIN_CHARS = 20;

export function validateLog(text: string): LogErrors {
  const errors: LogErrors = {};

  const trimmed = text.trim();

  if (!trimmed) {
    errors.text = "Please describe your situation.";
  } else if (trimmed.length < MIN_CHARS) {
    errors.text = `Please write at least ${MIN_CHARS} characters.`;
  } else if (trimmed.length > MAX_CHARS) {
    errors.text = `Please keep it under ${MAX_CHARS} characters.`;
  }

  return errors;
}