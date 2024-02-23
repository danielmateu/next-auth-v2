import { ExtendedUser } from "@/next-auth"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "@/components/ui/badge"


interface UserInfoProps {
    user?: ExtendedUser
    label: string
}

export const UserInfo = ({
    user,
    label
}: UserInfoProps
) => {
    return (
        <Card className="shadow-md">
            <CardHeader>
                <p className="text-center">{label}</p>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col gap-y-2">
                <div className="flex items-center justify-between rounded-lg border shadow-sm">
                    <p className="text-sm font-medium pl-2">
                        ID
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-2 bg-slate-200 rounded-md">
                        {user?.id}
                    </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border shadow-sm">
                    <p className="text-sm font-medium pl-2">
                        User Name
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-2 bg-slate-200 rounded-md">
                        {user?.name}
                    </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border shadow-sm">
                    <p className="text-sm font-medium pl-2">
                        Email
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-2 bg-slate-200 rounded-md">
                        {user?.email}
                    </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border shadow-sm">
                    <p className="text-sm font-medium pl-2">
                        Role
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-2 bg-slate-200 rounded-md">
                        {user?.role}
                    </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border shadow-sm">
                    <p className="text-sm font-medium pl-2">
                        2FA
                    </p>
                    <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                </div>
                <pre>
                    {JSON.stringify(user, null, 2)}
                </pre>
            </CardContent>
        </Card>
    )
}
