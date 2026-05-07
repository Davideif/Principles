'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";

export default function LogForm() {
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
        toast.error(err.error ?? "Failed to analyze. Please try again.");
        return;
      }

      const data = await res.json();
      setAiResponse(data.ai_response);
      toast.success("Your principles have spoken.");
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-4">

      {/* ── Form ── */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>What is going on?</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">

            {/* Situation */}
            <div className="space-y-2">
              <Label htmlFor="situation">Describe your situation</Label>
              <Textarea
                id="situation"
                placeholder="E.g. I have been fired from my job and I am not sure what to do next. I feel lost and demotivated..."
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>

          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !situation.trim()}
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
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Your principles say
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {aiResponse}
            </p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}