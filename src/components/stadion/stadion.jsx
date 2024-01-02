'use client'


import Titles from "../Titles"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdAlarmOn } from "react-icons/md";
import { useRouter } from "next/navigation";

const BlogCard = ({ blog: { title, desc, isChecked, telefon, imageUrl, _id, index } }) => {


    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         window.location.reload();
    //     }, 7000);
    //     return () => clearInterval(intervalId);
    // }, []);

   
    const router = useRouter();

    return (
        <div className="mx-1 max-w-7xl md:mx-auto bg-[#111] py-3 px-2 md:px-5 rounded-md mb-3 duration-300  hover:translate-x-7">
            {/* <Titles /> */}
            <div className='flex justify-between items-center'>
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
                <div>
                    {telefon === "" && (
                        <Link href={`/blog/edit/${_id}`}>
                            <p className='text-white flex gap-2 items-center border rounded-md border-white py-3 px-2'>  Buyurtma berish <FaUserEdit className="text-3xl text-red-700" /></p>
                        </Link>
                    )}
                    {telefon !== "" && !isChecked ? (
                        <div className="w-[170px]">
                            <p className='text-center py-1 rounded-md border border-white text-white'>
                                <span>
                                    Tekshirilmoqda...
                                </span>
                                <span>
                                    ({telefon})
                                </span>
                            </p>
                        </div>
                    ) : null}

                    {telefon !== "" && isChecked ? (
                        <h1 className="bg-red-700 py-4 px-3 rounded-md text-white"> <span className="font-bold">{telefon} {""}
                        </span>
                            <span className="font-light">
                                raqamiga Band
                            </span>
                        </h1>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
