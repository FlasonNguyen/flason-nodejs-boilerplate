"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@/app");
// import AuthRoute from '@routes/auth.route';
// import IndexRoute from '@routes/index.route';
// import UsersRoute from '@routes/users.route';
const _utils_1 = require("@utils");
new _utils_1.validateEnv();
const app = new app_1.default([]);
app.listen();
//# sourceMappingURL=server.js.map