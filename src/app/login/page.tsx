"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {signIn, signOut} from "next-auth/react"

export default function(){
    function handleOnClick(){
        signIn("google");
    }
    function handleSignOut(){
        signOut()
    }
    return (
        <div className="flex justify-center">
            <div className="">
                <Label>Login With Your Google Account</Label>
                <Button variant={"default"} onClick={handleOnClick}>Sign In</Button>
                <Button onClick={handleSignOut}>Sign Out</Button>
            </div>
        </div>
    )
}