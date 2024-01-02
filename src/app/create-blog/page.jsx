'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateBlog = () => {
    const CLOUD_NAME = 'dtznp6zu2'
    const UPLOAD_PRESET = 'b1gc39ol'

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState("Nature")
    const [photo, setPhoto] = useState('')
    const [telefon, setTelefon] = useState('')

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !desc) {
            toast.error("All fields are required")
            return
        }

        try {
            const imageUrl = await uploadImage()

            const res = await fetch(`http://localhohttps://fadsfda-5tfs.vercel.app//api/blog`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ title, desc, telefon, category, imageUrl })
            })

            if (!res.ok) {
                throw new Error("Error occurred")
            }

            const blog = await res.json()

            // router.push(`/`)
            toast.success('Muvaffaqiyatli!!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
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
            toast.error(error.message || "An error occurred while creating the post.")
        }
    }
    return (
        <div className='flex justify-center min-h-screen'>
            <div className='container'>
                <h2 className='text-xl text-white md:text-3xl my-2'>Qo`shish</h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <select className='mb-3 py-3 px-2' onChange={(e) => setTitle(e.target.value)}>
                        <option>Tanlang</option>
                        <option>Dushanba</option>
                        <option>Seshanba</option>
                        <option>Chorshanba</option>
                        <option>Payshanba</option>
                        <option>Juma</option>
                        <option>Shanba</option>
                        <option>Yakshanba</option>
                    </select>
                    <select className='mb-3 py-3 px-2' onChange={(e) => setDesc(e.target.value)}>
                        <option>Tanlang</option>
                        <option>17:00 :: 18:00</option>
                        <option>18:00 :: 19:00</option>
                        <option>19:00 :: 20:00</option>
                        <option>20:00 :: 21:00</option>
                        <option>21:00 :: 22:00</option>
                        <option>22:00 :: 23:00</option>
                        <option>23:00 :: 24:00</option>
                    </select>

                    <input className='mb-3 py-3 px-2' type="text" onChange={(e) => setTelefon(e.target.value)} value={telefon} />
                    <div className='flex gap-2 my-2 items-center justify-center text-white text-xl md:text-3xl'>
                        <label className='flex gap-2 items-center cursor-pointer' htmlFor='image'>
                            Rasm yuklash <AiOutlineFileImage />
                        </label>
                        <input
                            id='image'
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(e) => setPhoto(e.target.files[0])}
                            name="image"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button className='bg-white text-xl md:text-2xl py-3 px-10 rounded-md w-fit'>Qo`shing</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateBlog