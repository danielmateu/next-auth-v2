"use server"

import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
import { ResetSchema } from "@/schemas"
import * as z from "zod"


export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Mail inválido' }
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return { error: "No existe usuario con ese email" }
    }

    // TODO: Generate token & send email
    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return { success: "Email de reseteo enviado, por favor revisa tu bandeja de entrada" }

}