const{Router} = require("express");
const controller = require("../controllers/user");
const routers = Router();

routers.get("/register", controller.viewRegister);
routers.get("/login", controller.viewLogin);
routers.get("/dashboard", controller.viewDashboard);
routers.get("/dashboard/Addcharacter", controller.viewaddcharacter);

routers.post("/create-user",controller.createRegister);
routers.post("/create-Login",controller.createLogin);
routers.post("/create-Addcharacter",controller.viewaddcharacter);

module.exports = routers