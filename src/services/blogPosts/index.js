import express from 'express'
import PostModel from './schema.js'
import createError from 'http-errors'

const blogPostsRouter = express.Router()

// ===============  CREATES NEW BLOG POST =======================
blogPostsRouter.post('/', async (req, res, next) => {
    try {
        const newPost = new PostModel(req.body)
        const { _id } = await newPost.save()

        res.status(201).send({ _id })

    } catch (error) {
        if(error.name === "validationError") {
            next(createError(400, error))
        } else {
            console.log(error)
            next(createError(500, "An Error ocurred while creating a new post"))
        }
    }
})

// ===============  RETURNS BLOG POST LIST =======================
blogPostsRouter.get('/', async (req, res, next) => {
    try {
        const posts = await PostModel.find()
        res.send(posts)
    } catch (error) {
        next(createError(500, "An Error ocurred while getting the list of posts"))
    }
})

// ===============  RETURNS SINGLE BLOG POST =======================
blogPostsRouter.get('/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId
        const post = await PostModel.findById(postId)

        if(post) {
            res.send(post)
        } else {
            next(createError(404, `Post with _id ${postId} Not Found!`))
        }
    } catch (error) {
        next(createError(500, "An Error ocurred while getting the post"))
    }
})

// ===============  UPDATES A BLOG POST =======================
blogPostsRouter.put('/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId
        const modifiedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
            new: true,
            runValidators: true,
        } )

        if(modifiedPost) {
            res.send(modifiedPost)
        } else {
            next(createError(404, `Post with _id ${postId} Not Found!`))
        }
    } catch (error) {
        next(createError(500, `An Error ocurred while updating the post ${req.params.postId}`))
    }
})

// ===============  DELETES A BLOG POST =======================
blogPostsRouter.delete('/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId
        const deletedPost = await PostModel.findByIdAndDelete(postId)

        if (deletedPost) {
            res.status(204).send()
        } else {
            next(createError(404, `Post with _id ${postId} Not Found!`))
        }
    } catch (error) {
        next(createError(500, `An Error ocurred while deleting the post ${req.params.postId}`))
    }
})

export default blogPostsRouter