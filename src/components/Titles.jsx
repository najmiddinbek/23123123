export async function fetchBlogs() {
    const res = await fetch('https://fadsfda-w1vo.vercel.app//api/blog', { cache: 'no-store' })

    return res.json()
}


export default async function Home() {
    const blogs = await fetchBlogs()

    return (
        <div>
            <div>
                {blogs?.length > 0 ? blogs.map((blog, index) => (
                    <h1 key={index}>{blog.title}</h1>
                )) : <h3>No blogs are currently in the</h3>}
            </div>
        </div>
    )
}

