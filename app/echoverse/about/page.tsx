"use client"

import { useFetchMyArtistProfileQuery } from "@/redux/features/artistApiSlice";

export default function Page() {
    const {data, isLoading} = useFetchMyArtistProfileQuery()
    console.log(data)
    return <div>
        <h1>Get To Know Me</h1>
        <form>
            <input></input>
        </form>
    </div>;
}
