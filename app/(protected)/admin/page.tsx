"use client"

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { toast } from "sonner"

const AdminPage = () => {
    const role = useCurrentRole();
    const onServerActionClick = () => {
        admin()
            .then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }

                if (data.success) {
                    toast.success(data.success)
                }
            })
    }

    const onApiRouteClick = () => {
        fetch("/api/admin")
            .then((data) => {
                if (data.ok) {
                    toast.success("Permitido")
                } else {
                    toast.error("No permitido")
                }
            })
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <h1 className="text-center">🗝️ Admin Page</h1>
            </CardHeader>
            <CardContent>
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message={`Bienvenido, ${role}`} />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Ruta API para ADMIN
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Haz click para probar
                    </Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Server Action para ADMIN
                    </p>
                    <Button onClick={onServerActionClick}>
                        Haz click para probar
                    </Button>
                </div>
            </CardContent>

        </Card>
    )
}

export default AdminPage