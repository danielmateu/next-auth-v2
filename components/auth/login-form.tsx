"use client"
import { CardWrapper } from './card-wrapper'



export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel="Bienvenido!"
            backButtonLabel="Aun no tienes cuenta?"
            backButtonHref="/auth/register"
            showSocial
        >
            Login Form
        </CardWrapper>
    )
}
