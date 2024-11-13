"use client"
import useProtected from '@/hooks/useProtected';
import React from 'react'

export default function AuthProvider({
    children
}: {
    children: React.ReactNode;
}) {
    useProtected()
    return children
}
