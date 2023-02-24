const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Route: 1 fetch all notes
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id})
        res.send(notes)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error occured")
        
    }
})
//Route: 2  add  all notes
router.post('/addnotes',fetchuser,[
    body('title',"Enter a valid title").isLength({min:3}),
    body('description','Description must be at least 5 charectors').isLength({min:5})

], async (req,res)=>{
    try {
        const {title,description,tag} = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
        const note = new Notes({
            title,description,tag,user:req.user.id
    
        })  
        const saveNote = await note.save()
        res.json(saveNote)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error occured")
    }



})

//Update notes
router.put('/updatenotes/:id',fetchuser, async (req,res)=>{
    try {
        
        const {title,description,tag} = req.body;
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
        
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not Found")
    
        }
        if(note.user.toString() !==req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.send({note})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error occured")
        
        
    }
})

//Delete notes
router.delete('/deletenotes/:id',fetchuser, async (req,res)=>{
    try {
        
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not Found")
    
        }
        if(note.user.toString() !==req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.send({"Success":"note has been deleted",note:note})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error occured")
        
    }
    
})
module.exports = router