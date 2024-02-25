"use server"

import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { SettingsSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from 'bcrypt';


export const settings = async (values: z.infer<typeof SettingsSchema>) => {

    const user = await currentUser()
    if (!user) {
        return { error: "No se ha iniciado sesión" }
    }

    const dbUser = await getUserById(user.id)
    if (!dbUser) {
        return { error: "Usuario no encontrado" }
    }

    if (user.isOauth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)

        if (existingUser && existingUser.id !== user.id) {
            return { error: "El correo electrónico ya está en uso" }
        }

        const verificationToken = await generateVerificationToken(values.email)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return { success: "Se ha enviado un correo electrónico de verificación" }
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(values.password, dbUser.password)
        if (!passwordsMatch) {
            return { error: "La contraseña actual no es correcta" }
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10)

        values.password = hashedPassword
        values.newPassword = undefined
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            ...values
        }
    })


    return { success: "Configuración actualizada!" }
}