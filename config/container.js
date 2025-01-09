//Configurar nuestro contenedor de injección de depencia
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require(".");

//Routes
const Routes = require("../routes");

//Services
const {
    ExampleService,
    PermissionService,
    UserService,
    PermissionTypeService
} = require("../services");
//Controllers
const {
    ExampleController,
    PermissionController,
    UserController,
    PermissionTypeController
} = require("../controllers");

//Startup
const { Database, Server } = require("../startup");

//Routes

const {
    ExampleRoutes,
    PermissionRoutes,
    UserRoutes,
    PermissionTypeRoutes
} = require("../routes/api/index");

//Models
const {
    Example,
    Permission,
    User,
    PermissionType
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
        PermissionService: asClass(PermissionService).singleton(),
        UserService: asClass(UserService).singleton(),
        PermissionTypeService: asClass(PermissionTypeService).singleton(),
    })
    .register({
        //Configuración de los controladores
        ExampleController: asClass(ExampleController.bind(ExampleController)).singleton(),
        PermissionController: asClass(PermissionController.bind(PermissionController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        PermissionTypeController: asClass(PermissionTypeController.bind(PermissionTypeController)).singleton(),
    })
    .register({
        //Configuración de rutas
        ExampleRoutes: asFunction(ExampleRoutes).singleton(),
        PermissionRoutes: asFunction(PermissionRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
        PermissionTypeRoutes: asFunction(PermissionTypeRoutes).singleton(),
    })
    .register({
        //Configuración de modelos
        Example: asValue(Example),
        Permission: asValue(Permission),
        User: asValue(User),
        PermissionType: asValue(PermissionType)


    })
    .register({
        //middlewares
        AuthMiddleware: asFunction(protect).singleton(),
    });

module.exports = container;
