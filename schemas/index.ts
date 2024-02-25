import { UserRole } from "@prisma/client"
import * as z from "zod"

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6, {
        message: "Se requiere contraseña de al menos 6 caracteres"
    })),
    newPassword: z.optional(z.string().min(6, {
        message: "Se requiere contraseña de al menos 6 caracteres"
    })),
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false
        }

        return true
    }, {
        message: "Se requiere nueva contraseña",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false
        }

        return true
    }, {
        message: "Se requiere password",
        path: ["password"]
    })

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Se requiere contraseña de al menos 6 caracteres"
    }),
    // password_confirmation: z.string().min(6, {
    //     message: "Se requiere confirmación de contraseña"
    // }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Se requiere email"
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Se requiere email"
    }),
    password: z.string().min(1, {
        message: "Se requiere contraseña"
    }),
    code: z.optional(z.string())
})

export const RegisterSchema = z.object({
    name: z.string().min(2, {
        message: "Se requiere nombre"
    }),
    email: z.string().email({
        message: "Se requiere email"
    }),
    password: z.string().min(6, {
        message: "Se requiere contraseña de al menos 6 caracteres"
    })
})

