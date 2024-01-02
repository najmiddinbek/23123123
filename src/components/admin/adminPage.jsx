'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { FaUserEdit } from "react-icons/fa";
import { MdAlarmOn } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegSquareCheck } from "react-icons/fa6";
import LargeImageModal from '../Modal';
import { toast } from 'react-toastify';

const BlogCard = ({ blog: { title, desc, isChecked, imageUrl, telefon, _id } }) => {
    const isPhoneEmpty = telefon;
    const [isImageClicked, setIsImageClicked] = useState(false);

    const handleImageClick = () => {
        // Toggle the state to show/hide the larger image
        setIsImageClicked(!isImageClicked);
    };


    useEffect(() => {
        const intervalId = setInterval(() => {
            window.location.reload();
        }, 20000);
        return () => clearInterval(intervalId);
    }, []);

    const changeStatus = async (id) => {
        if (isChecked && isPhoneEmpty) {
            isChecked = false;
        }

        const confirmed = confirm("To`lov qilinganligi tekshirildimi?");

        if (confirmed) {
            const res = await fetch(`http://localhohttps://fadsfda-5tfs.vercel.app/api/blog?id=${id}`, {
                method: "PUT",
            });

            if (res.ok) {
                location.reload();
            }
        }
    };

    return (
        <div>

            <div className="relative max-w-7xl mx-auto bg-[#111] py-3 px-2 md:px-5 rounded-md mb-3">
                <div className='block md:flex items-center max-w-7xl w-full justify-between mx-auto'>
                    <div>
                        <div className='flex gap-10 w-full items-center'>
                            {/* <h3>{title}</h3> */}
                            <p className="text-xl md:text-2xl font-bold uppercase text-white flex gap-3 items-center">
                                {desc}</p>
                            <button
                                className={`${isChecked
                                    ? "text-green-500 bg-black"
                                    : "text-red-500 bg-sky-950"
                                    }`}
                            >
                                {isChecked ? "" : ""}
                            </button>
                        </div>
                    </div>
                    <div className='mt-3'>
                        {telefon === "" && (
                            <div className='flex gap-3'>
                                <button

                                    className={`${isChecked
                                        ? "bg-red-700 py-4 px-2 text-white rounded-md"
                                        : "text-white py-4 px-1 md:px-3 text-[13px]  rounded-md bg-red-700"
                                        }`}
                                >
                                    {isChecked ? <FaRegSquareCheck className='text-4xl' /> : "Hozircha buyurtma kelmadi"}
                                </button>

                            </div>
                        )}
                        {telefon !== "" && !isChecked ? (
                            <div className='flex gap-3'>
                                <button
                                    onClick={() => changeStatus(_id)}
                                    className={`${isChecked
                                        ? "bg-red-700 px-2 text-white rounded-md"
                                        : "text-white px-3 bg-green-900 rounded-md "
                                        }`}
                                >
                                    {isChecked ? "fasd" : <FaRegSquareCheck className='text-2xl' />}
                                </button>
                                <Link className='bg-red-700 p-2 rounded-md text-white' href={`/noReal/edit/${_id}`}>
                                    <IoCloseCircleOutline className='text-[30px]' />
                                </Link>

                            </div>
                        ) : null}

                        {/* {telefon !== "" && (
                            <h1>
                                {telefon}
                            </h1>
                        )} */}

                        {telefon !== "" && isChecked ? (
                            <div className='flex gap-3 items-center'>
                                {/* <Link className='bg-red-700 py-4 px-3 rounded-md text-white' href={`/noReal/edit/${_id}`}><ImExit /></Link> */}
                                <h1 className="bg-green-900 py-4 px-3 rounded-md text-white"><span className="font-bold">{telefon} {""}
                                </span>
                                    <span className="font-light">
                                        ga band
                                    </span>
                                </h1>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </div>
                <div className="absolute top-6 right-5 md:static">
                    <Image
                        src={imageUrl}
                        width="100"
                        height="100"
                        onClick={handleImageClick}
                        className={`${isImageClicked ? 'cursor-pointer' : ''}`}
                    />

                    <div className="">
                        <div className="">
                            {isImageClicked && (
                                <LargeImageModal imageUrl={imageUrl} onClose={handleImageClick} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
