import mongoose, {Schema} from 'mongoose'

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true,'title is required']
        },
        author: {
            type: String,
            required: [true,'author is required']
        },
        publishYear: {
            type: Number,
            required: [true,'publish year is required']
        }
    },
    { timestamps: true}
)
export const Book = mongoose.model("Book", bookSchema);
