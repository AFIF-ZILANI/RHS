"use client";
import React from "react";
import Image from "next/image";
import SchoolLogo from "@/assets/images/logo 2.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
    username: z.string().min(10).max(10),
    accountType: z.enum(["STUDENT", "TEACHER"], {
        required_error: "You need to select a role to continue.",
    }),
    password: z.string().min(10),
    email: z.string().email(),
});

export default function Page() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    });

    // 2. Define a submit handler.
    function OnSubmit(values: z.infer<typeof formSchema>) {
        // const {} = useMutation(() => axios.post("", values))
        // console.log(values);
    }

    return (
        <div className="mt-[100px] sm:mt-1">
            <div className="flex flex-col items-center">
                <Image
                    src={SchoolLogo}
                    alt="RHS School Logo"
                    className="sm:w-[400px] md:w-[600px] w-[300px]"
                />
                <h2 className="merienda sm:text-xl text-purple-700">
                    Stay Connected with your school online!
                </h2>
            </div>
            <div className="mt-8">
                <div className="sm:mx-[150px] rounded-[8px] shadow-2xl p-4 flex justify-center">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(OnSubmit)}
                            className="w-2/3 space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="accountType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Choose your role</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="STUDENT" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Student
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="TEACHER" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Teacher
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="X:xxxxxxxx"
                                                {...field}
                                                className="rounded-lg"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your identity in your school.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="example@email.com"
                                                {...field}
                                             type="email"/>
                                        </FormControl>
                                        <FormDescription>
                                            This can be used for your account recovery!.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="###"
                                                {...field}
                                             type="password"/>
                                        </FormControl>
                                        <FormDescription>
                                            Do not Share your password with any one!.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center">
                            <Button type="submit" className="flex justify-center">Create Account</Button>
                            </div>
                            <div className="flex justify-end">
                                <Link href="/login" className="text-purple-800 text-[16px] hover:underline merienda">Alreay have an Account?</Link>
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="flex justify-center mt-[10px] mb-7">
                    <div className="flex md:gap-[100px] gap-6 ">
                        <p className="font-extralight text-[12px] roboto hover:cursor-pointer">Help</p>
                        <p className="font-extralight text-[12px] roboto hover:cursor-pointer">FAQ</p>
                        <p className="font-extralight text-[12px] roboto hover:cursor-pointer">Contact</p>
                        <p className="font-extralight text-[12px] roboto hover:cursor-pointer">ATTAZ LLC</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
