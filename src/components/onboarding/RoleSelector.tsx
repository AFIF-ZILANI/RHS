"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface RoleSelectorProps {
  role: "student" | "teacher" | null;
  onRoleChange: (role: "student" | "teacher") => void;
  onNext: () => void;
}

export function RoleSelector({ role, onRoleChange, onNext }: RoleSelectorProps) {
  return (
    <div className="space-y-4">
      <RadioGroup
        value={role || ""}
        onValueChange={(value) => onRoleChange(value as "student" | "teacher")}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="student" id="student" />
          <Label htmlFor="student">Student</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="teacher" id="teacher" />
          <Label htmlFor="teacher">Teacher</Label>
        </div>
      </RadioGroup>
      <Button
        className="w-full mt-6"
        onClick={onNext}
        disabled={!role}
      >
        Continue
      </Button>
    </div>
  );
}