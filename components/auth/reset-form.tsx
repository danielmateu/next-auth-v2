"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { CardWrapper } from './card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetSchema } from '@/schemas'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success'

import { useState, useTransition } from 'react'
import { resetPassword } from '@/actions/reset-password'



export const ResetForm = () => {

    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            resetPassword(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }

    return (
        <CardWrapper
            headerLabel="Has olvidado tu password?"
            backButtonLabel="Volver a login"
            backButtonHref="/auth/login"
        // showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className="space-y-4">
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

                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" size="lg" className='w-full' disabled={isPending}>
                        Resetea tu password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
