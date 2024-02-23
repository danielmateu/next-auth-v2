
import { UserInfo } from "@/components/user-info"
import { currentUser } from "@/lib/auth"


const ServerPage = async () => {
    const user = await currentUser()
    return (
        <div>
            <UserInfo
                user={user}
                label="Current User - 🖥️ Server component"
            />
        </div>
    )
}

export default ServerPage