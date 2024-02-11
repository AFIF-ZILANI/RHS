"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum OptionsOfAccount {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
    NONE = "NONE",
}

export enum OptionsOfGenders {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
    NONE = "none",
}

export enum OptionsOfReligions {
    MUSLIM = "muslim",
    HINDU = "hindu",
    CHRISTIANITY = "christianity",
    BUDDHISM = "buddhism",
    IRRELIGION = "irreligion",
    OTHER = "other",
    NONE = "none",
}

type InitialState = {
    accountType: OptionsOfAccount;
    credentials: Credentials;
    email: string;
    basicData: BasicData;
    registrationProgress: number[];
};

type Credentials = {
    username: string;
    password: string;
};

type BasicData = {
    fullName: string;
    address?: string;
    gender: OptionsOfGenders;
    religion: OptionsOfReligions;
    age: string;
    phone: string;
};

const initialState: InitialState = {
    accountType: OptionsOfAccount.NONE,
    credentials: {
        username: "",
        password: "",
    },
    basicData: {
        fullName: "",
        gender: OptionsOfGenders.NONE,
        religion: OptionsOfReligions.NONE,
        age: "",
        address: "",
        phone: "",
    },
    email: "",
    registrationProgress: [100, 0, 0, 0, 0],
};

export const register = createSlice({
    name: "register",
    initialState,
    reducers: {
        updateAccountType(
            state,
            action: PayloadAction<{ value: "STUDENT" | "TEACHER" }>
        ) {
            if (action.payload.value === "TEACHER") {
                state = {
                    ...state,
                    accountType: OptionsOfAccount.TEACHER,
                    registrationProgress: [100, 100, 0, 0, 0],
                };
            }

            if (action.payload.value === "STUDENT") {
                state = {
                    ...initialState,
                    accountType: OptionsOfAccount.TEACHER,
                    registrationProgress: [100, 100, 0, 0, 0],
                };
            }
        },
        updateCredentials(
            state,
            action: PayloadAction<{
                username: string;
                password: string;
            }>
        ) {
            if (
                action.payload.password === "" ||
                action.payload.username === "" ||
                !action.payload.password ||
                !action.payload.password
            ) {
                throw new Error(
                    "Username and password is required to update credentials!"
                );
            }

            state = {
                ...state,
                credentials: {
                    password: action.payload.password,
                    username: action.payload.username,
                },
                registrationProgress: [100, 100, 100, 0, 0],
            };
        },
        updateBasicData(
            state,
            action: PayloadAction<{
                fullName: string;
                address?: string;
                age: string;
                religion:
                    | "MUSLIM"
                    | "HINDU"
                    | "BUDDHISM"
                    | "CHRISTIANITY"
                    | "IRRELIGION"
                    | "OTHER";
                gender: "MALE" | "FEMALE" | "OTHER";
                phone: string;
            }>
        ) {
            const findRel = () => {
                const Religion = action.payload.religion;
                if (Religion === "MUSLIM") {
                    return OptionsOfReligions.MUSLIM;
                }
                if (Religion === "CHRISTIANITY") {
                    return OptionsOfReligions.CHRISTIANITY;
                }
                if (Religion === "BUDDHISM") {
                    return OptionsOfReligions.BUDDHISM;
                }
                if (Religion === "HINDU") {
                    return OptionsOfReligions.HINDU;
                }
                if (Religion === "IRRELIGION") {
                    return OptionsOfReligions.IRRELIGION;
                }
                if (Religion === "OTHER") {
                    return OptionsOfReligions.OTHER;
                }
                return OptionsOfReligions.NONE;
            };

            const findgen = () => {
                const Gender = action.payload.gender;
                if (Gender === "MALE") {
                    return OptionsOfGenders.MALE;
                }
                if (Gender === "FEMALE") {
                    return OptionsOfGenders.FEMALE;
                }
                if (Gender === "OTHER") {
                    return OptionsOfGenders.OTHER;
                }
                return OptionsOfGenders.NONE;
            };
            state = {
                ...state,
                basicData: {
                    fullName: action.payload.fullName,
                    address: action.payload?.address || "",
                    age: action.payload.age,
                    religion: findRel(),
                    gender: findgen(),
                    phone: action.payload.phone,
                },
                registrationProgress: [100, 100, 100, 100, 0],
            };
        },
        updateVerification(state, action: PayloadAction<{ email: string }>) {
            state = {
                ...state,
                email: action.payload.email,
                registrationProgress: [100, 100, 100, 100, 100],
            };
        },
    },
});

export const { updateAccountType, updateCredentials, updateBasicData } =
    register.actions;
export default register.reducer;
