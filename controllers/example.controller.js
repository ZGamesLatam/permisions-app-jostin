const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");
let _exampleService = null;
module.exports = class ExampleController extends BaseController {
  constructor({ ExampleService }) {
    super(ExampleService);
    _exampleService = ExampleService;
  }
  hello = catchControllerAsync(async (req, res) => {
    const result = await _exampleService.hello();
    return appResponse(res, result);
  })
};
