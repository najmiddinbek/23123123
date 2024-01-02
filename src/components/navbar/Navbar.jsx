import Link from 'next/link';
import React from 'react'
import { PiSealCheckFill } from "react-icons/pi";

export default function Navbar() {
  return (
    <Link href={"/kod"}>
      <div className='flex justify-center text-white items-center text-4xl gap-2 navbar pb-4 mb-5'>
        Admin
        <div className='text-5xl'>
          <PiSealCheckFill />
        </div>
      </div>
    </Link>
  )
}
