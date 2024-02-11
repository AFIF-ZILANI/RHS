"use client";

import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { AppSelector } from "@/app/GlobalRedux/store";

export function RegisterProgress() {
    const {registrationProgress} = AppSelector((state) => state.registerReducer)
    const [progress, setProgress] = useState(registrationProgress);

    return (
        <div>
            <div className="flex gap-[10px]">
                <Progress value={progress[0]} className="md:w-[110px]" />
                <Progress value={progress[1]} className="md:w-[110px]" />
                <Progress value={progress[2]} className="md:w-[110px]" />
                <Progress value={progress[3]} className="md:w-[110px]" />
                <Progress value={progress[4]} className="md:w-[110px]" />
            </div>
            <div className="ml-[35px] w-[550px] flex justify-between">
                <p className="relative ">Role</p>
                <p className="relative left-[10px]">creadintials</p>
                <p className="relative ">Basic data</p>
                <p className="relative right-[10px]">verification</p>
                <p className="relative right-3">Finish Up</p>
            </div>
        </div>
    );
}
