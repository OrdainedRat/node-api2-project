const express = require('express');
const router = express.Router()
// implement your posts router here

const Post = require('./posts-model')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    const selectedPost = await Post.findById(id)
    try {
        if(!selectedPost) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(selectedPost)
        }
    } catch(err) {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
})

router.post('/', async (req, res) => {
    const post = req.body;
    console.log(post)
    try {
        if(!post.title || !post.contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else { 
            const postId = await Post.insert(post);
            const updatedPost = await Post.findById(postId.id)
            res.status(201).json(updatedPost)
        }
    } catch(err) {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    const selectedPost = await Post.findById(id)
    try {
        if(!body.title || !body.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
        }
        else if(!selectedPost) {
            res.status(404).json({ message: "The post with the specified ID does not exist" }) 
        } else {
            const updatedId = await Post.update(selectedPost.id, body)
            const updatedPost = await Post.findById(updatedId)
            res.status(200).json(updatedPost)
        }
        
    
    } catch(err) {
        res.status(500).json({ message: "The post information could not be modified" })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const selectedPost = await Post.findById(id)
    try {
        if(!selectedPost) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            const deletedPost = await Post.remove(selectedPost.id)
            console.log(deletedPost)
            res.status(200).json(selectedPost)
        }
    } catch(err) {
        res.status(500).json({ message: "The post could not be removed" })
    }
})

router.get('/:id/comments', async (req, res) => {
    const { id } = req.params;
    const selectedPost = await Post.findById(id);
    try {
        if(!selectedPost) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            const comments = await Post.findPostComments(selectedPost.id)
            res.status(200).json(comments)
        }
    } catch(err) {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
})

module.exports = router;
