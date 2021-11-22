const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../models/users.model");
const addcharacter = require("../models/character.models")

const { APP_SECRET } = process.env;

const createToken = (id) => {
    return jwt.sign({ id }, APP_SECRET, { expiresIn: "7 days" });
  };
const viewRegister = (req, res ) => {
    return res.render("register");
};
const viewLogin = (req, res ) => {
    return res.render("login");
};
const viewDashboard = (req, res ) => {
    return res.render("dashboard");
};
const viewaddcharacter = (req, res ) => {
    return res.render("Addcharacter");
};
const createaddcharacter = async (req,res) => {
    const {Character,Gender,Weapon,Skill } = req.body;  
    await addcharacter.create({
        Character,
        Gender,
        Weapon,
        Skill,
    });

    return res.status(301).rediect('dashboard')
};

const createRegister = async(req ,res, next) => {
      try{
        const {email,password} = req.body;
        console.log(req.body);
        if(!email){
            throw {
                message:`email must be valid`,
                code:400,
                error: `bad request`,
            };
        }

        if (!password || password.length < 8){
            throw {
                message:`password min length 8 character`,
                code:400,
                error: `bad request`,
            };
        }

        const isExist = await User.findOne({
            where:{
                email,
            }
        });

        if(isExist){
            throw{
                message:`user already exists`,
                code:400,
                error: `bad request`,
            }
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await User.create({
            email,
            password:passwordHash,
        });


        const token = await createToken(isExist.id);

        return res.status(201).json({
            msg:"success create user",
            user,
            token:`bearer ${token}`,
        });
       }catch (error) {
        next(error);
    }

};
const createLogin = async(req ,res, next) => {
    try{
      const {email,password} = req.body;
      console.log(req.body);
      if(!email){
          throw {
              message:`email must be valid`,
              code:400,
              error: `bad request`,
          };
      }

      if (!password || password.length < 8){
          throw {
              message:`password min length 8 character`,
              code:400,
              error: `bad request`,
          };
      }
      const isExist = await User.findOne({
          where:{
              email,
          },
      });

      if(!isExist){
          throw{
              message:`user not found`,
              code:404,
              error: `bad request`,
          }
      }

      const isMatch = await bcrypt.compare(password, isExist.password);

      if(!isMatch){
        throw{
            message: `wrong password`,
            code:404,
            error: `bad request`,
        }

      }

      const token = await createToken(isExist.id);

      return res.status(201).json({
          msg:"success create user",
          token:`bearer ${token}`,
      });
     }catch (error) {
      next(error);
  }

};

module.exports = {viewRegister,viewLogin,createRegister,createLogin,viewDashboard,viewaddcharacter,createaddcharacter}