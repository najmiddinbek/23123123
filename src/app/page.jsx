import BlogCard from '@/components/stadion/stadion'

export async function fetchBlogs() {
  const res = await fetch('https://fadsfda-w1vo.vercel.app/api/blog', { cache: 'no-store' })
  return res.json()
}

export default async function Home() {

  const blogs = await fetchBlogs()

  const days = [
    {
      id: 1,
      kun: 'Dushanba',
    },
    {
      id: 2,
      kun: 'Seshanba'
    },
    {
      id: 3,
      kun: 'Chorshanba'
    },
    {
      id: 4,
      kun: 'Payshanba',
    },
    {
      id: 5,
      kun: 'Juma',
    },
    {
      id: 6,
      kun: 'Shanba',
    },
    {
      id: 7,
      kun: 'Yakshanba'
    }
  ]

  return (
    <div>
      <div className=''>
        {blogs?.length > 0 ? (
          blogs.reduce((acc, blog, index) => {
            if (index % 6 === 0) {
              const day = days[(index / 6) % days.length];
              acc.push(
                <div key={`greeting-${index}`}>
                  <h1 className='text-center text-2xl md:text-5xl mt-10 mb-2 text-white uppercase font-bold'>{day.kun}</h1>
                </div>
              );
            }
            acc.push(
              <BlogCard key={blog._id} blog={blog} />
            );
            return acc;
          }, [])
        ) : (
          <h3>No blogs are currently in the</h3>
        )}
      </div>
    </div>
  )
}


// import Link from 'next/link'
// import React from 'react'
// import { MdOutlineStadium } from "react-icons/md";
// import { MdStadium } from "react-icons/md";

// export default function page() {
//   return (
//     <div className='max-w-7xl mx-auto w-full'>
//       <div className='flex justify-center flex-col text-center h-screen'>
//         <Link className='bg-white mb-3 rounded-md text-3xl font-bold py-5 px-2 flex gap-3 justify-center' href={"/"}>
//           Usti <span className='text-red-600'>ochiq</span> stadion band qilish
//           <MdOutlineStadium />
//         </Link>
//         <Link className='bg-white mb-3 rounded-md text-3xl font-bold py-5 px-2 flex gap-3 justify-center' href={"/"}>
//           Usti <span className='text-red-600'>yopiq</span>stadion band qilish
//           <MdStadium />
//         </Link>
//       </div>
//     </div>
//   )
// }
