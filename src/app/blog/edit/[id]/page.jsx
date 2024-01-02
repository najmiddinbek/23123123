'use client'

import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { BsEnvelopePlus } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";


const Edit = (ctx) => {
    const CLOUD_NAME = 'dtznp6zu2'
    const UPLOAD_PRESET = 'b1gc39ol'
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("Nature")
    const [photo, setPhoto] = useState("")
    const [telefon, setTelefon] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);



    const router = useRouter()

    useEffect(() => {
        async function fetchBlog() {
            const res = await fetch(`http://localhohttps://fadsfda-5tfs.vercel.app/api/blog/${ctx.params.id}`)
            const blog = await res.json()
            setTitle(blog.title)
            setDesc(blog.desc)
            setCategory(blog.category)
            setTelefon(blog.telefon)
        }
        fetchBlog()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title === '' || category === '' || desc === '') {
            toast.error('Telefon raqam hamda rasm yuklaganingizni tekshirib ko`ring!', {
                position: 'top-center'
            });
            return;
        }

        try {
            setIsLoading(true);

            let imageUrl = null;
            if (photo) {
                imageUrl = await uploadImage();
            }

            const body = {
                title,
                desc,
                category,
                telefon,
            };

            if (imageUrl != null) {
                body.imageUrl = imageUrl;
            }

            const res = await fetch(`http://localhohttps://fadsfda-5tfs.vercel.app/api/blog/${ctx.params.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error('Error has occurred');
            }

            toast.success('So`rovingiz muvaffaqiyatli yuborildi, tasdiqlanishini kuting!', {
                position: 'top-center',
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });

            setTimeout(() => {
                router.push('/');
            }, 9000)

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

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

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setPhoto(selectedFile);

        const temporaryImageUrl = URL.createObjectURL(selectedFile);
        setSelectedImage(temporaryImageUrl);
    };

    const handleCopyClick = () => {
        const telefonElement = document.getElementById('telefon');
        if (telefonElement) {
            const range = document.createRange();
            range.selectNode(telefonElement);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            try {
                document.execCommand('copy');
                toast.success('Telefon raqam nusxalandi!', {
                    position: 'top-center',
                });
            } catch (err) {
                console.error('Unable to copy', err);
            }

            window.getSelection().removeAllRanges();
        }
    };
    return (
        <div className=''>
            <div className='max-w-7xl mx-auto px-2 md:px-10 w-full text-white'>
                <form className='flex flex-col h-screen mt-20' onSubmit={handleSubmit}>
                    <p className='text-[18px] md:text-xl font-light mb-4'>
                        Siz <span className='text-red-500 font-bold'>{title}</span> kuni soat <span className='text-red-500 font-bold'>{desc}</span>  ga  stadionni band qilmoqchimisiz? To`lov qilingan skrinshot chekini yuboring! Admin skrinshotni tekshirib chiqgach, to`lov haqiqiy bo`lsa, bosh sahifada sizni kiritgan telefon raqamingiz chiqib keladi.
                    </p>

                    <div className='flex gap-5 items-center mb-3'>
                        <p id='telefon' className='text-4xl font-bold'>
                            9860003047855
                        </p>
                        <h1 className='text-4xl font-bold'>Zokirjon</h1>


                        <div>
                            <FaCopy className='text-3xl cursor-pointer text-white' onClick={handleCopyClick} />
                        </div>

                    </div>

                    <input className='py-3 px-2 md:px-2 md:py-3 rounded-md text-black' placeholder='Telefon raqamingizni kiriting' type="number" onChange={(e) => setTelefon(e.target.value)} value={telefon} />

                    <label className='flex items-center justify-center border bg-white text-black py-2 rounded-md gap-2 cursor-pointer mt-3 text-[16px] md:text-xl' htmlFor='image'>
                        Rasm yuklash uchun bosing <MdOutlineDriveFolderUpload className='text-3xl' />
                    </label>
                    <input id='image' type="file" style={{ display: 'none' }} onChange={handleImageChange} />
                    <div className=''>
                        {selectedImage && (
                            <>
                                <h1 className='mt-4 my-2 text-xl md:text-2xl'>Siz tanlagan rasm:</h1>
                                <img src={selectedImage} className='w-full h-[50vh] object-cover' alt="Image" />
                            </>
                        )}
                    </div>

                    <div className="flex justify-end mt-3 ">
                        {selectedImage ? (
                            <button
                                className={`bg-red-600 py-3 px-2 rounded-md flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    } ${isLoading ? 'message_animation' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Yuborilmoqda...' : 'Buyurtma berish uchun bosing '}
                                <BsEnvelopePlus className='text-xl md:text-2xl' />
                            </button>
                        ) : (
                            <div className='bg-red-600 py-3 px-2 rounded-md flex items-center gap-2 opacity-50 cursor-not-allowed'>
                                <BsEnvelopePlus className='text-xl md:text-2xl' />
                                Rasm tanlang
                            </div>
                        )}
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Edit