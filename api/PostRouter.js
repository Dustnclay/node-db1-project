const express = require('express');
const { where } = require('../data/dbConfig.js');
const db = require("../data/dbConfig.js");

const router = express.Router()

router.get('/', (req,res) => {

    db.select('*').from('accounts')
        .then(post => 
            res.status(200).send(post))
        .catch(err => 
            res.status(400).json({message:"error in server"})
        )

});
 
router.get('/:id', (req,res) => {
    const {id} = req.params
    console.log(id)

    db.select('*').from('accounts').where('id',id)
        .then(post => 
            res.status(200).send(post))
        .catch(err => 
            res.status(400).json({message:"error in server"})
            )
});

router.post('/', validateBody, (req,res) => {
    const newAccount = req.body;
    db('accounts').insert(newAccount)
        .then(post => 
            res.status(200).send(post))
        .catch(err => 
            res.status(400).json({message:"error in server"})
            )

});

router.put('/:id', validateId, (req,res) => {
    const {id} = req.params
    const changes = req.body

    db('accounts').update(changes).where('id', id)
        .then(post => 
            res.status(200).send(changes))
        .catch(err => 
            res.status(400).json({message:"error in server"})
            )
});

router.delete('/:id',validateId, (req,res) => {
    const {id} = req.params

        db('accounts').where('id',id).del()
        .then(post => 
            res.status(200).send(id))
        .catch(err => 
            res.status(400).json({message:"error in server"})
            )        


});
function validateId (req,res,next) {
     const {id} = req.params
    console.log(id)

    db.select('*').from('accounts').where('id',id)

        .then(theid =>{ if(theid[0] !== undefined){
            console.log(theid[0]),
            next()
        }else{
            res.status(400).json({message:"ID not found"})
        }})
        .catch(err => 
            console.log(err)
            )
};

function validateBody (req,res,next) {
    const body = req.body
    if(body.name && body.budget){
        next()
    }
    else{
        res.status(400).json({message:"enter valid name and body"})
    }
}
 
 
 module.exports = router 