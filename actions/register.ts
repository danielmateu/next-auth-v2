"use server"

import bcrypt from "bcrypt"
import { RegisterSchema } from "@/schemas"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Campos invalidos' }
    }

    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: 'Este email ya existe' }
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    })

    const verificationToken = await generateVerificationToken(email)
    // Send verification token email
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return {
        success: "Email de confirmación enviado, por favor revisa tu bandeja de entrada"
    }
}