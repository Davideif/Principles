'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LogForm() {
  const [log, setLog] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ log }), 
      });

      if (!res.ok) {
        toast.error('Failed to save log. Please try again.');
        return;
      }

      const data = await res.json();
      toast.success('Log saved successfully.');

      return data;
    } catch (err) {
      toast.error('An error occurred while saving the log.');
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Describe your situation</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="log">Your Situation</Label>
            <Textarea
              id="log"
              placeholder="E.g., I've been fired from my job and I'm not sure what to do next."
              value={log}
              onChange={(e) => setLog(e.target.value)}
              rows={5}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Apply YOUR principles
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}