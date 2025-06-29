"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var auth_1 = require("./auth");
var transaction_1 = require("./transaction");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
// Connect to MongoDB
mongoose_1["default"].connect(process.env.DB_CONNECTION_STRING)
    .then(function () {
    console.log("Connected to MongoDB");
})["catch"](function (err) {
    console.error("Failed to connect to MongoDB", err);
});
// Mount routes
app.use('/api/auth', auth_1["default"]);
app.use('/api/transactions', transaction_1["default"]);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
//  npx tsx index.js
