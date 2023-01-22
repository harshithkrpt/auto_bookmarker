const express = require('express');
const Bookmark = require('../models/models')
const router = express.Router();

// Add Data
router.post('/addbookmark',async (req,res) => {
    if(!req.body.currentBookmarkValue) {
        res.status(400).send({
            err : "Please Check the Issue"
        });
    }

    const bookmark = new Bookmark({currentBookmarkValue: req.body.currentBookmarkValue })

    try {
        let data = await bookmark.save();
        res.status(200).send({
            msg: "Success",
            id: data._id
        });
    }
    catch(err) {
        res.status(400).send({err});
    }
});

// Get Data
router.get('/getbookmarks',async (req,res) => {
    try {
        const data = await Bookmark.find({});
        res.send({
            data
        });
    }
    catch(err) {
        res.send(500,{
            err
        })
    }  
})

// Update Data
router.post('/updatebookmark',async (req,res) => {
    try {
        const { id, currentBookmarkValue } = req.body;

        await Bookmark.findByIdAndUpdate(id,{ currentBookmarkValue });
        res.send(200,{
            msg: 'Success'
        });
    }
    catch(err) {
        res.send(500,{
            err: 'Failed with 500'
        })
    }
})

// Delete Data
router.post('/deletebookmark',async (req,res) => {
    try {
        const { id } = req.body;

        await Bookmark.findByIdAndDelete(id);
        res.send(200,{
            msg: 'Successfully Deleted'
        });
    }
    catch(err) {
        res.send(500,{
            err: 'Failed with 500'
        })
    }
})

module.exports = router;