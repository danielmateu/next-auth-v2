
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Resetea tu contraseña',
        html: `<p>Tu 2FA ${token}</p>`,
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Resetea tu contraseña',
        html: `<p>Haz Click <a href="${resetLink}">aquí</a> para resetear tu password</p>`,
    })

}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Confirma tu email',
        html: `<p>Haz Click <a href="${confirmLink}">aquí</a> para confirmar tu email</p>`,
    })
}