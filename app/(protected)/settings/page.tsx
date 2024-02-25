"use client"
import * as z from "zod"
import { settings } from "@/actions/settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import { useTransition, useState } from 'react';
import { FcDataConfiguration } from "react-icons/fc"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SettingsSchema } from "@/schemas"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCurrentUser } from "@/hooks/use-current-user"
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UserRole } from "@prisma/client"
import { Switch } from "@/components/ui/switch"

const SettingsPage = () => {
    const user = useCurrentUser()
    const [error, setError] = useState<string | undefined>()
    const [succes, setSucces] = useState<string | undefined>()

    const { update } = useSession()
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
        }

    })
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        settings(values)
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                }

                if (data.success) {
                    update()
                    setSucces(data.success)
                }
            })
            .catch((error) => {
                setError("Error al actualizar el nombre")
            })
    }
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <div className="flex justify-center gap-2">
                    <FcDataConfiguration className="text-2xl" />
                    <h1>Configuraciones</h1>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4 mb-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='John Doe'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.isOauth === false &&
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder='john.doe@gmail.com'
                                                        disabled={isPending}
                                                        type="email"
                                                    />
                                                </FormControl>
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
                                                        {...field}
                                                        placeholder='******'
                                                        disabled={isPending}
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nuevo Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder='******'
                                                        disabled={isPending}
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isTwoFactorEnabled"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>2FA</FormLabel>
                                                    <FormDescription>Activa la autenticación de dos factores</FormDescription>

                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        disabled={isPending}
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            }
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value={UserRole.USER}>
                                                    User
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <FormError message={error} />
                        <FormSuccess message={succes} />
                        <Button type="submit" disabled={isPending}>
                            Guardar
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SettingsPage