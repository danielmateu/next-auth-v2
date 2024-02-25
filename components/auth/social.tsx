"use client"

import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from '../../routes';
import { useSearchParams } from "next/navigation"


export const Social = () => {


    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <div className="flex items-center justify-center w-full gap-x-2">
            <Button size={"lg"} variant={"outline"} className="w-full" >
                <FcGoogle className="text-2xl" onClick={() => onClick("google")} />
            </Button>
            <Button size={"lg"} variant={"outline"} className="w-full" >
                <FaGithub className="text-2xl" onClick={() => onClick("github")} />
            </Button>
        </div>
    )
}
