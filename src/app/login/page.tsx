"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {signIn, signOut} from "next-auth/react"

"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School2 } from "lucide-react";
import { LoginButton } from "@/components/LoginButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[380px] shadow-xl">
          <CardHeader className="text-center">
            <School2 className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
           <LoginButton/>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}