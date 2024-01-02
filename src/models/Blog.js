import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1000
    },
    desc: {
        type: String,
        required: true,
        min: 1000
    },
    imageUrl: {
        type: String,
        required: true,
    },
    telefon: { type: String },
    isChecked: { type: Boolean, default: false },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }, // Adjust the reference model name accordingly
}, { timestamps: true });

export default mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema);
