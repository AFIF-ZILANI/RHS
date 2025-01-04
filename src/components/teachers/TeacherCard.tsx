"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeacherCardProps {
  teacher: {
    name: string;
    image?: string;
    subjects: string[];
  };
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={teacher.image} alt={teacher.name} />
          <AvatarFallback>
            {teacher.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{teacher.name}</h3>
          <p className="text-sm text-muted-foreground">
            {teacher.subjects.join(", ")}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
}