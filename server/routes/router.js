const express=require('express');
const loginuser = require('../controllers/logincontroller');
const fetchUser=require('../controllers/fetchusercontroller');
const addnote = require('../controllers/addNotecontroller');
const deletenote = require('../controllers/deletenotecontroller');
const editnote = require('../controllers/editnotecontroller');
const router= express.Router();

router.post('/login',loginuser);
router.get('/fetchUser/:id',fetchUser);
router.post('/addNote/:id',addnote);
router.delete('/deleteNote/:id',deletenote);
router.put('/editNote/:id',editnote);

module.exports=router;