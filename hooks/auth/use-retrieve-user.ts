"use client"

import { useRetrieveUserQuery } from "@/redux/features/authApiSlice"

export default function useRetrieveUser () {
    const {data} = useRetrieveUserQuery()
    return {data}
}