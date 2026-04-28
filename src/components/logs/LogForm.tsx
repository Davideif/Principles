'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default function LogForm() {

  const [logData, setLogData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logData),
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
        <CardTitle>New Log Entry</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Log Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Log Title"
              name="title"
              value={logData.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Log Content</Label>
            <Textarea
              id="content"
              placeholder="Log Content"
              name="content"
              value={logData.content}
              onChange={handleChange}
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Save Log
          </Button>
        </CardFooter>
      </form>
    </Card>
  );

 }; 

