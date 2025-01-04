"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleSelector } from "@/components/onboarding/RoleSelector";
import { IdInput } from "@/components/onboarding/IdInput";
import { PersonalInfo } from "@/components/onboarding/PersonalInfo";
import { useSession } from "next-auth/react";

export default function OnboardingPage() {
    const { data: session } = useSession();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<"student" | "teacher" | null>(null);
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState<Date>();
    const [classNumber, setClassNumber] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [agreed, setAgreed] = useState(false);

    if (session && session.user?.name && session?.user.email) {
        setFullName(session.user.name);
    }
    
    const nextStep = () => setStep(step + 1);
    function handleOnSubmit() {}
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="w-[380px] shadow-xl">
                            <CardHeader>
                                <CardTitle>Select Your Role</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RoleSelector
                                    role={role}
                                    onRoleChange={setRole}
                                    onNext={nextStep}
                                />
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {step === 2 && role && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="w-[380px] shadow-xl">
                            <CardHeader>
                                <CardTitle>
                                    {role === "student"
                                        ? "Student ID"
                                        : "Teacher ID"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <IdInput
                                    id={id}
                                    role={role}
                                    onIdChange={setId}
                                    onNext={nextStep}
                                />
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {step === 3 && role && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="w-[380px] shadow-xl">
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PersonalInfo
                                    role={role}
                                    fullName={fullName}
                                    dob={dob}
                                    classNumber={classNumber}
                                    rollNumber={rollNumber}
                                    agreed={agreed}
                                    onFullNameChange={setFullName}
                                    onDobChange={setDob}
                                    onClassNumberChange={setClassNumber}
                                    onRollNumberChange={setRollNumber}
                                    onAgreementChange={setAgreed}
                                    onSubmit={handleOnSubmit}
                                />
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
