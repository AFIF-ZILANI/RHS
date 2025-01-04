"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { TeacherCard } from "@/components/teachers/TeacherCard";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("/api/teachers")
      .then((res) => res.json())
      .then(setTeachers);
  }, []);

  return (
    <div className="container py-8 flex flex-col items-center min-h-[90vh]">
      <PageHeader
        title="Our Teachers"
        description="Meet our dedicated teaching staff"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}