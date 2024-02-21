"use client"

import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"

export const Social = () => {
    return (
        <div className="flex items-center justify-center w-full gap-x-2">
            <Button size={"lg"} variant={"outline"} className="w-full" >
                <FcGoogle className="text-2xl" onClick={() => { }} />
            </Button>
            <Button size={"lg"} variant={"outline"} className="w-full" >
                <FaGithub className="text-2xl" onClick={() => { }} />
            </Button>
        </div>
    )
}
