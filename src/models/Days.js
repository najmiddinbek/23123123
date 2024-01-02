import mongoose from "mongoose";

const KunlarSchema = new mongoose.Schema({
    haftaKuni: { type: String, },
}, { timestamps: true })

export default mongoose?.models?.Kunlar || mongoose.model("Kunlar", KunlarSchema)