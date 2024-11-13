'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SideBarCom = () => {
    return (
        <div className=' flex flex-col justify-center items-center h-[calc(100vh - 60px)]'>
            <div  className='ml-2 flex flex-col justify-center items-center border-2 border-blue-100 rounded-lg'>
                <Link href="/" className='p-4 w-full hover:bg-white hover:bg-opacity-35 transition-all duration-500'>Create new</Link>
                <Link href="/" className='p-4 w-full hover:bg-white hover:bg-opacity-35 transition-all duration-500'>Analytics</Link>
                <Link href="/" className='p-4 w-full hover:bg-white hover:bg-opacity-35 transition-all duration-500'>Templates</Link>
            </div>
        </div>
    )
}

export default SideBarCom   