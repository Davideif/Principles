'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";


// ── Types ─────────────────────────────────────────────────────────────────────

interface LogFormProps {
  onSuccess?: () => void
}


export default function LogForm({ onSuccess }: LogFormProps) {
  const [situation, setSituation] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!situation.trim()) return;
    setLoading(true);
    setAiResponse("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 429) {
          toast.error("AI is rate limited. Please wait a minute and try again.");
        } else {
          toast.error(err.error ?? "Failed to analyze. Please try again.");
        }
        return;
      }

      const data = await res.json();
      setAiResponse(data.ai_response);
      toast.success("Your principles have spoken.");
      onSuccess?.();
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-4">

      {/* ── Form ── */}
      <Card className="w-full border-border bg-card">
        <CardHeader>
          <CardTitle className="font-serif font-normal text-xl text-foreground">
            What is going on?
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="situation"
                className="text-sm text-muted-foreground font-sans"
              >
                Describe your situation
              </Label>
              <Textarea
                id="situation"
                placeholder="E.g. I have been fired from my job and I am not sure what to do next. I feel lost and demotivated..."
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows={6}
                className="resize-none bg-muted/40 border-border text-foreground placeholder:text-muted-foreground font-sans focus-visible:ring-primary"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              disabled={loading || !situation.trim()}
              className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold font-sans"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Apply your principles
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* ── AI Response ── */}
      {aiResponse && (
        <Card className="w-full border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base font-sans font-medium flex items-center gap-2 text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Your principles say
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans text-muted-foreground">
              {aiResponse}
            </p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}