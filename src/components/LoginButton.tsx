"use client";
import React from "react";
import { Button } from "./ui/button";
import { MouseEvent } from "react";
import { signIn } from "next-auth/react";

export function LoginButton() {
    function handleOnClick(e: MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        signIn("google");
    }

    return <Button onClick={handleOnClick}>Continue With Google</Button>;
}
