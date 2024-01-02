import db from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const blog = await Blog.findById(id).populate("authorId").select('-password')

        return new Response(JSON.stringify(blog), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function PUT(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const body = await req.json()
        const blog = await Blog.findById(id).populate('authorId')

        const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })

        return new Response(JSON.stringify(updatedBlog), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function DELETE(req, ctx) {
    await db.connect()

    const id = ctx.params.id
    try {
        await Blog.findByIdAndDelete(id)

        return new Response(JSON.stringify({ msg: 'Successfully deleted blog' }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}
