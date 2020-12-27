const express = require('express');
const { findByIdAndDelete } = require('../models/post.js');
const router = express.Router();
const postModel = require('../models/post.js');

router.get('/', async (req, res) => {
    try {
        const posts = await postModel.find({});
        return res.status(200).json(posts);   
    } catch (error) {
        return res.status(400).json({
            message: 'Malumotlar omborida xatolik yuz berdi'
        })
    }
});

router.post('/', async (req, res) => {
    try {
        // await postModel.create(req.body);
        const post = new postModel({
            title: req.body.title,
            body: req.body.body
        });
    
        const postResult = await post.save();
        return res.status(200).json(postResult)
    } catch (error) {
        return res.status(400).json({
            message: 'Serverda xatolik yuz berdi'
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
         await postModel.findByIdAndUpdate(id, req.body);
         const updatedPost = await postModel.find({ _id: id });
        return res.status(200).json(updatedPost)
    } catch (error) {
        return res.status(400).json({
            message: 'Serverda xatolik yuz berdi'
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await postModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'Muvofaqqiyatli o\'chirildi!'
        })
    } catch (error) {
        return res.status(400).json({
            message: `${error}`
        })
    }
})

module.exports = router;