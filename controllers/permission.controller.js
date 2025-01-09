const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");

module.exports = class PermissionController extends BaseController {
    // Inyectas el PermissionService
    constructor({ PermissionService }) {
        // Pasamos el servicio al BaseController, para getAll, getOne, create, etc.
        super(PermissionService);
        this.permissionService = PermissionService;
    }

    // Ejemplo de endpoint específico para crear un permiso con validación de tipo
    createWithType = catchControllerAsync(async (req, res) => {
        const { body } = req;
        const newPermission = await this.permissionService.createWithType(body);
        return res.status(201).json(newPermission);
    });

    // Endpoint para aprobar un permiso
    approve = catchControllerAsync(async (req, res) => {
        const { id } = req.params;
        const { userAdminId } = req.body;
        const result = await this.permissionService.approvePermission(id, userAdminId);
        return res.status(200).json(result);
    });

    // Endpoint para rechazar un permiso
    reject = catchControllerAsync(async (req, res) => {
        const { id } = req.params;
        const { userAdminId, reason } = req.body;
        const result = await this.permissionService.rejectPermission(id, userAdminId, reason);
        return res.status(200).json(result);
    });
};
