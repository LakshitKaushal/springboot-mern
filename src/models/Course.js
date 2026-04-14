import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema(
  {
    code: { type: Number, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    provider: { type: String },
    image: { type: String },
    imageurl: { type: String }, // keep compatibility with existing frontend field
    duration: { type: Number },
    tags: [{ type: String }],
    courseurl: { type: String }
  },
  { timestamps: true }
)

export default mongoose.model('Course', courseSchema)



