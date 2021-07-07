import mongoose from 'mongoose'

const { Schema, model } = mongoose

const PostSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
        },
        readTime: {
            value: {
                type: Number,
            },
            unit: {
                type: String,
            },
        },
        author: {
            name: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
            },
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default model("Post", PostSchema)