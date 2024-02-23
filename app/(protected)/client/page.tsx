"use client"

import { UserInfo } from "@/components/user-info"
import { useCurrentUser } from "@/hooks/currentUser"

const ClientPage = () => {
    const user = useCurrentUser()
    return (
        <div>
            <UserInfo
                user={user}
                label="Current User - 📱 Client component"
            />
        </div>
    )
}

export default ClientPage