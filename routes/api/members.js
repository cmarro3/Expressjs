const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members')
// get all memebers 
router.get('/', (req,res)=> res.json(members));

//get single member 
router.get('/:id', (req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json(members.filter(member =>member.id === parseInt(req.params.id)));
    } else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// create member

router.post('/', (req,res)=>{
    const newmember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newmember.name || !newmember.email){
       return res.status(400).json({msg: 'Please include a name and email'})
    } 

    members.push(newmember);
     res.json(members);
    // res.redirect('/')

});

//update member 
router.put('/:id', (req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        const updatemember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updatemember.name ? updatemember.name: member.name;
                member.email = updatemember.email ? updatemember.email: member.email;
                
                res.json({msg: 'member was updated', member});
            }
        });
    } else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

//delete memeber 

router.get('/:id', (req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json({msg: 'member deleted',members: members.filter(member =>member.id !== parseInt(req.params.id))});
    } else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;