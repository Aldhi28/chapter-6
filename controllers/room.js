require('dotenv').config()
const jwt = require('jsonwebtoken')
const {APP_SECRET} = process.env
const bcrypt = require('bcrypt')
const { Room } = require('../models');


const creteRoom = async (req, res, next) => {
    // const token = req.headers.authorization;
    // if (!token)
    // return res.json({
    //     massage:"unauthorize",
    // })
    try{
        const { name } = req.body;
        const rooms = await Room.create({
            name
        })
        res.json({
                massage:"berhasil buat room ",
                rooms  
            });
    }catch(error){
        next(error)
    }
   

    
    

    
    
}

module.exports = {creteRoom }