const{Router} = require("express");
const controller = require("../controllers/user");
const controllerRoom = require("../controllers/room")
const controllerFight = require("../controllers/fight")
const middleware = require("../middleware/verify.middleware")
const routers = Router();

routers.get("/register", controller.viewRegister);
routers.get("/login", controller.viewLogin);
routers.get("/dashboard", controller.viewDashboard);
routers.get("/dashboard/Addcharacter", controller.viewaddcharacter);

routers.post("/create-user",controller.createRegister);
routers.post("/create-Login",controller.createLogin);
routers.post("/create-Addcharacter",controller.viewaddcharacter);
routers.post("/create-room",middleware.verify,controllerRoom.creteRoom);
routers.post("/fight/:id",middleware.verify,controllerFight.fight);
// routers.post("/create-room",middleware.verify)


// routers.post('/create-room', verify, (req, res)=>{
//     const { user } = req;
//     return res.send({
//         "test":"aa",
//         user
//     })
// })

module.exports = routers