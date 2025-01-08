//Configurar nuestro contenedor de injección de depencia
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require(".");

//Routes
const Routes = require("../routes");

//Services
const {
    ExampleService,
} = require("../services");
//Controllers
const {
    ExampleController,
} = require("../controllers");

//Startup
const { Database, Server } = require("../startup");

//Routes

const {
    ExampleRoutes,
} = require("../routes/api/index");

//Models
const {
    Example,
} = require("../models");

const { protect } = require("../middleware/authMiddleware");
const AuthUtils = require("../utils/auth");
const container = createContainer();
container
    .register({
        //Configuración principal
        router: asFunction(Routes).singleton(),
        config: asValue(config),
        AuthUtils: asClass(AuthUtils).singleton(),
        Database: asClass(Database).singleton(),
        Server: asClass(Server).singleton(),
    })
    .register({
        //Configuración de los servicios
        ExampleService: asClass(ExampleService).singleton(),
    })
    .register({
        //Configuración de los controladores
        ExampleController: asClass(ExampleController.bind(ExampleController)).singleton(),
    })
    .register({
        //Configuración de rutas
        ExampleRoutes: asFunction(ExampleRoutes).singleton(),
    })
    .register({
        //Configuración de modelos
        Example: asValue(Example),
    })
    .register({
        //middlewares
        AuthMiddleware: asFunction(protect).singleton(),
    });

module.exports = container;
