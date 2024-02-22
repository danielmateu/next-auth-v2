"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { ScaleLoader } from "react-spinners";
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(async () => {

        if (success || error) return

        if (!token) {
            setError("Token inválido")
            return
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Algo ha salido mal")
            })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirmar tu correo electrónico"
            backButtonHref="/auth/login"
            backButtonLabel="Volver al inicio de sesión"
        >
            <div className="flex flex-col items-center w-full justify-center">
                {
                    !success && !error && (
                        <ScaleLoader color="#0EA5E9" />
                    )
                }
                <FormSuccess message={success} />
                {
                    !success && (
                        <FormError message={error} />
                    )
                }
            </div>
        </CardWrapper>
    )
}
