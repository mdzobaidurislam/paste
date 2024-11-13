import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function useProtected() {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, status } = useSession() as any;

    useEffect(() => {
        if (!data || !data?.user) {
            router.push("/admin");
        }
    }, [data, router])

    if (status == "unauthenticated") {

        return <div>Loading...</div>;
    }



}
