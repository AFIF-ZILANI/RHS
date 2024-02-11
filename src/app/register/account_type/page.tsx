"use client";
import React from "react";
import Image from "next/image";
import TeacherIcon from "@/assets/icons/teacher.svg";
import StudentIcon from "@/assets/icons/student.svg";
import SchoolLogo from "@/assets/images/logo 2.svg";
import { useRouter } from "next/navigation";
import { RegisterProgress } from "@/components/custom/registerProgress";
export default function Page() {
    const registrationStatus = {
        status: [100, 0, 0, 0, 0],
    };
    localStorage.setItem("registerStatus", JSON.stringify(registrationStatus));
    const router = useRouter();
    
    function handleClick(type: string){
        localStorage.setItem
    }
    return (
        <div className="w-full h-screen bg-white flex justify-center items-start">
            <div className="my-5">
            <div className="w-full flex justify-center">
                <RegisterProgress />
            </div>
                <div className=" border-b-2 border-dotted border-gray-400">
                    <Image src={SchoolLogo} alt="school logo" className="" />
                </div>
                <div className="flex flex-col gap-4 mt-[50px]">
                    <button className="md:p-2 rounded-lg flex items-center gap-3 bg-blue-500 active:scale-[1.01] hover:bg-blue-600 md:w-[500px]" onClick={() => handleClick("TEACHER")}>
                        <Image
                            src={TeacherIcon}
                            alt="Teacher icon"
                            className="md:w-[100px] md:ml-[50px]"
                        />
                        <p className="merienda md:text-2xl text-gray-50">
                            Continue as a Teacher
                        </p>
                    </button>
                    <button
                        className="md:p-2 rounded-lg flex items-center gap-3 bg-purple-700 active:scale-[1.01] hover:bg-purple-800 md:w-[500px]"
                        onClick={() => handleClick("STUDENT")}
                    >
                        <Image
                            src={StudentIcon}
                            alt="Teacher icon"
                            className="md:w-[100px] md:ml-[50px]"
                        />
                        <p className="merienda md:text-2xl text-gray-50">
                            Continue as a student
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}
