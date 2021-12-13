require('dotenv').config()
const jwt = require('jsonwebtoken')
const {APP_SECRET} = process.env
const bcrypt = require('bcrypt')
const {UserRole, User, rooms } = require('../models');


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
    await userRoles.create({
        Character,
        Gender,
        Weapon,
        Skill,
    });

    return res.status(301).rediect('dashboard')
};

const createRegister = async(req ,res, next) => {
      try{
        const {fullName,email,password} = req.body;
        console.log(req.body);

        if(!fullName){
            throw {
                message:`fullName must be valid`,
                code:400,
                error: `bad request`,
            };
        }
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
            fullName,
            email,
            password:passwordHash,
            role:{
                name: "PlayerUser"
            }
        },
        {
            include: [
                {
                    model: UserRole,
                    as: 'role'
                }
            ]
          }
        );

console.log(user)
        const token = await createToken(user.id);

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
          msg:"success login user",
          token:`bearer ${token}`,
      });
     }catch (error) {
      next(error);
  }

};



module.exports = {viewRegister,viewLogin,createRegister,createLogin,viewDashboard,viewaddcharacter,createaddcharacter}