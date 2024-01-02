'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Kod() {
    const [input, setInput] = useState('');

    const router = useRouter();

    function kodniTekshirish(e) {
        e.preventDefault()
        if (input === "admin12345") {
            router.push('/admin')
        } else {
            router.push('/')
        }
    }

    return (
        <div>
            <form onSubmit={kodniTekshirish} className='flex flex-col justify-center max-w-7xl mx-auto w-full h-[85vh] px-5'>
                <input className='py-4 px-3 rounded-md text-black text-xl outline-none' placeholder='Admin parolini yozing...' type="text" onChange={(e) => setInput(e.target.value)} />
                <button className='py-3 rounded-md bg-red-700 mt-2 text-white text-2xl uppercase'>kirish</button>
            </form>
        </div>
    )
}
