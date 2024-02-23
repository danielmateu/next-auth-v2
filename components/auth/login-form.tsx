"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { CardWrapper } from './card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'

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
import { Button } from '../ui/button'
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success'
import { login } from '@/actions/login'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'


export const LoginForm = () => {
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Este email ya está registrado con otro método de autenticación" : ""

    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }

                    if (data?.success) {
                        form.reset()
                        setSuccess(data.success)
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                })
                .catch(() => setError("Algo salió mal, por favor intenta de nuevo"))
        })
    }

    return (
        <CardWrapper
            headerLabel="Bienvenido!"
            backButtonLabel="Aun no tienes cuenta?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className="space-y-4">
                        {
                            showTwoFactor && (
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Código de doble autenticación</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value || ""}
                                                    placeholder="123654"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        }
                        {
                            !showTwoFactor && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="johndoe@gmail.com" {...field}
                                                        disabled={isPending}
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
                                                <FormLabel>password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="******"
                                                        type='password'{...field}
                                                        disabled={isPending} />
                                                </FormControl>
                                                <span className='flex justify-end'>
                                                    <Button
                                                        variant={'link'}
                                                        asChild
                                                        className='px-0 font-normal'
                                                    >
                                                        <Link href="/auth/reset">
                                                            Has olvidado tu password?
                                                        </Link>
                                                    </Button>
                                                </span>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )
                        }
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button type="submit" size="lg" className='w-full' disabled={isPending}>
                        {
                            showTwoFactor ? "Verificar" : "Iniciar sesión"
                        }
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
