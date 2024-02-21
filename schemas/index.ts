import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Se requiere email"
    }),
    password: z.string().min(1, {
        message: "Se requiere contraseña"
    })
})

