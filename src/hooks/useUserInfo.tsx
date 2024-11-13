import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function useUserInfo() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!data || !data.user) {
    return { user: {} };
  }
  const { user } = data;
  return { user };


}
