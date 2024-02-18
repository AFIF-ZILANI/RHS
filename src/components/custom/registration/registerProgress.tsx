"use client";

import React, { useEffect, useState } from "react";
import { Progress } from "../../ui/progress";

export function RegisterProgress({status}: {status: number[]}) {
    const [progress, setProgress] = useState(status);
    return (
        <div>
            <div className="flex gap-[10px]">
                <Progress value={progress[0]} className="md:w-[110px] w-[65px]" />
                <Progress value={progress[1]} className="md:w-[110px] w-[65px]" />
                <Progress value={progress[2]} className="md:w-[110px] w-[65px]" />
                <Progress value={progress[3]} className="md:w-[110px] w-[65px]" />
                <Progress value={progress[4]} className="md:w-[110px] w-[65px]" />
            </div>
            <div className="ml-[35px] w-[330px] flex justify-between">
                <p className="relative text-[10px] right-[12px]">Role</p>
                <p className="relative right-[3px] text-[10px]">creadintials</p>
                <p className="relative text-[10px] right-[5px]">Basic data</p>
                <p className="relative right-[9px] text-[10px]">verification</p>
                <p className="relative right-[9px] text-[10px]">Finish Up</p>
            </div>
        </div>
    );
}
