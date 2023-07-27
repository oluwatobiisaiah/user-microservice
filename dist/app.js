"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const helmet_1 = __importDefault(require("helmet"));
const secrets_1 = require("./utils/main/secrets");
const notFound_1 = __importDefault(require("./middlewares/errors/notFound"));
const internalErrorHandler_1 = __importDefault(require("./middlewares/errors/internalErrorHandler"));
const cors_1 = __importDefault(require("cors"));
// import xss from "xss-clean";
const express_form_data_1 = __importDefault(require("express-form-data"));
const database_config_1 = __importDefault(require("./config/database.config"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
// app.use(xss())
app.use(express_form_data_1.default.parse());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (secrets_1.ALLOWED_ORIGINS.indexOf(origin) === -1) {
            let msg = "The CORS policy for this site does not " +
                "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
}));
app.disable("x-powered-by");
app.get(`/api/${secrets_1.APP_VERSION}`, (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({
        error: false,
        message: "User Microservice ⚡️",
        data: null,
    });
});
// routes
app.use(`/api/${secrets_1.APP_VERSION}/users`, users_routes_1.default);
app.use(notFound_1.default);
app.use(internalErrorHandler_1.default);
(async () => {
    await database_config_1.default
        .sync()
        .then(() => {
        console.log("Database successfully connected");
    })
        .catch((err) => {
        console.log(err.message);
    });
    app.listen(secrets_1.PORT, () => {
        if (secrets_1.NODE_ENV === "development") {
            console.log(`<<<<<<<<<<<<<<<< Yeeeep,Server running on port ${secrets_1.PORT}..>>>>>>>>>>>`);
        }
    });
})();
