"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IdInputProps {
  id: string;
  role: "student" | "teacher";
  onIdChange: (id: string) => void;
  onNext: () => void;
}

export function IdInput({ id, role, onIdChange, onNext }: IdInputProps) {
  return (
    <div className="space-y-4">
      <Input
        placeholder={`Enter your ${role} ID`}
        value={id}
        onChange={(e) => onIdChange(e.target.value)}
      />
      <Button
        className="w-full"
        onClick={onNext}
        disabled={!id}
      >
        Continue
      </Button>
    </div>
  );
}