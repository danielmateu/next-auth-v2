import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Se requiere email"
    }),
    password: z.string().min(1, {
        message: "Se requiere contraseña"
    })
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

