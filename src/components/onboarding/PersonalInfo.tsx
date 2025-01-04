"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonalInfoProps {
  role: "student" | "teacher";
  fullName: string;
  dob: Date | undefined;
  classNumber: string;
  rollNumber: string;
  agreed: boolean;
  onFullNameChange: (name: string) => void;
  onDobChange: (date: Date | undefined) => void;
  onClassNumberChange: (classNum: string) => void;
  onRollNumberChange: (rollNum: string) => void;
  onAgreementChange: (agreed: boolean) => void;
  onSubmit: () => void;
}

export function PersonalInfo({
  role,
  fullName,
  dob,
  classNumber,
  rollNumber,
  agreed,
  onFullNameChange,
  onDobChange,
  onClassNumberChange,
  onRollNumberChange,
  onAgreementChange,
  onSubmit,
}: PersonalInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Date of Birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dob && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dob ? format(dob, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dob}
              onSelect={onDobChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {role === "student" && (
        <>
          <div className="space-y-2">
            <Label>Class</Label>
            <Input
              placeholder="Enter your class"
              value={classNumber}
              onChange={(e) => onClassNumberChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Roll Number</Label>
            <Input
              placeholder="Enter your roll number"
              value={rollNumber}
              onChange={(e) => onRollNumberChange(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreed}
          onCheckedChange={(checked : any) => onAgreementChange(checked as boolean)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the terms and conditions
        </label>
      </div>

      <Button
        className="w-full"
        onClick={onSubmit}
        disabled={!fullName || !dob || !agreed || (role === "student" && (!classNumber || !rollNumber))}
      >
        Create Account
      </Button>
    </div>
  );
}