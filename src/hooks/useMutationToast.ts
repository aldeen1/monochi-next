'use client'

import React from "react";
import toast from "react-hot-toast";

import {AxiosResponse, AxiosError} from "axios";
import { UseMutationResult } from "@tanstack/react-query";

import { ApiResponse, ApiError } from "@/types/api/api";
import { showToast,  DANGER_TOAST, SUCCESS_TOAST } from "@/app/components/Toasts/Toast";
import { DEFAULT_TOAST_MEESSAGE } from "@/constant/toast";

type OptionType = {
    loading? : string,
    success? : string,
    error? : string
}

export default function useMutationToast<T, K>(
    mutationFn: UseMutationResult<
        AxiosResponse<ApiResponse<T>>,
        AxiosError<ApiError>,
        K
    >,
    customMessages: OptionType = {}
){
    const {data, error, isError, isPending} = mutationFn

    const toastStatus = React.useRef<string>(data ? "done" : "pending")

    React.useEffect(() => {
        const toastMessage = {
            ...DEFAULT_TOAST_MEESSAGE,
            ...customMessages
        }

        if (toastStatus.current === "done" && !isPending) return;

        if (isError){
            showToast(
                typeof toastMessage.error === 'string' 
                ? toastMessage.error : toastMessage.error(error), 
                DANGER_TOAST,
            )
            toastStatus.current = "done";
        }else if (isPending){
            toastStatus.current = toast.loading(toastMessage.loading)
        }else if(data){
            showToast(toastMessage.success, SUCCESS_TOAST)
            toastStatus.current = "done"
        }

        return () => {
            toast.dismiss(toastStatus.current)
        }
    }, [customMessages, data, error, isError, isPending])

    return mutationFn
}
