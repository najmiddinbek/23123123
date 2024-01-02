import db from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req) {
    let mongooseConnection;

    try {
        mongooseConnection = await db.connect();
        const blogs = await Blog.find({}).limit(1000).populate("authorId");
        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response(JSON.stringify(null), { status: 500 });
    }
}


export async function POST(req) {
    await db.connect()

    try {
        const body = await req.json()
        const newBlog = await Blog.create(body)

        return new Response(JSON.stringify(newBlog), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}


export async function PUT(request) {
    const id = request.nextUrl.searchParams.get("id");
    await db.connect();
    const existingTopic = await Blog.findById(id);
    if (!existingTopic) {
        return new Response(JSON.stringify({ message: "Topic not found" }), { status: 404 });
    }
    existingTopic.isChecked = !existingTopic.isChecked;
    const updatedTopic = await existingTopic.save();
    return new Response(JSON.stringify({ message: "Topic updated", updatedTopic }), { status: 200 });
}