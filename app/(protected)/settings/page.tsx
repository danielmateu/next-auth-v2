"use client"

import { logout } from "@/actions/logout"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/currentUser"
import { useSession } from "next-auth/react"

const SettingsPage = () => {
    // const session = useSession()
    const user = useCurrentUser()

    const onClick = () => {
        logout()
    }
    return (
        <div className="">
            {/* <code className="bg-gray-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-700 transition-all">
                {
                    JSON.stringify(user)
                }
            </code> */}

            {/* <Button variant={"destructive"} onClick={onClick}>Logout</Button> */}
        </div>
    )
}

export default SettingsPage