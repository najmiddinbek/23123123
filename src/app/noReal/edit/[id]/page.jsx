'use client'

import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { AiOutlineFileImage } from 'react-icons/ai'

const Edit = (ctx) => {
    const CLOUD_NAME = 'dtznp6zu2'
    const UPLOAD_PRESET = 'b1gc39ol'
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")
    const [telefon, setTelefon] = useState('')
    const router = useRouter()

    const submitButtonRef = useRef(null);

    useEffect(() => {
        if (submitButtonRef.current) {
            submitButtonRef.current.click();
        }
    }, []);

    useEffect(() => {
        setTelefon("")
    })

    useEffect(() => {
        async function fetchBlog() {
            const res = await fetch(`http://localhohttps://fadsfda-5tfs.vercel.app/api/blog/${ctx.params.id}`)
            const blog = await res.json()
            setTelefon(blog.telefon)
        }
        fetchBlog()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            let imageUrl = null
            if (photo) {
                imageUrl = await uploadImage()
            }

            const body = {
                telefon
            }

            if (imageUrl != null) {
                body.imageUrl = imageUrl
            }

            const res = await fetch(`http://localhohttps://fadsfda-5tfs.vercel.app/api/blog/${ctx.params.id}`, {
                headers: {
                    "Content-Type": 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(body)
            })

            if (!res.ok) {
                throw new Error("Error has occurred")
            }

            const blog = await res.json()
            router.push(`/admin`)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async () => {
        if (!photo) return

        const formData = new FormData()

        formData.append("file", photo)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            })

            const data = await res.json()

            const imageUrl = data['secure_url']

            return imageUrl
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='max-w-7xl mx-auto px-5 items-center h-screen'>
            <div className='flex items-center h-screen justify-center'>
                <form className='flex flex-col text-white' onSubmit={handleSubmit}>
                    <span class="loader2"></span>
                    <input className='hidden' type="text" onChange={(e) => setTelefon(e.target.value)} value={telefon} />
                    <button ref={submitButtonRef} style={{ display: 'none' }}>Buyurtma berish uchun bosing</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Edit