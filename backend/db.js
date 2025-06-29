"use strict";
exports.__esModule = true;
exports.Transaction = exports.User = void 0;
// filepath: ts-backend-app/db.ts
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
// Connect to MongoDB
mongoose_1["default"].connect(process.env.MONGO_URI)
    .then(function () {
    console.log("Connected to MongoDB");
})["catch"](function (err) {
    console.error("Failed to connect to MongoDB", err);
});
var userSchema = new mongoose_1["default"].Schema({
    username: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    firstname: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true, required: true }
});
var transactionSchema = new mongoose_1["default"].Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, "enum": ['pending', 'completed', 'failed'], required: true },
    userId: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, "default": Date.now }
});
var User = mongoose_1["default"].model('User', userSchema);
exports.User = User;
var Transaction = mongoose_1["default"].model('Transaction', transactionSchema);
exports.Transaction = Transaction;
