"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.authMiddleware = void 0;
// filepath: ts-backend-app/auth.ts
var express_1 = require("express");
var zod_1 = require("zod");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcryptjs_1 = require("bcryptjs");
var db_1 = require("./db");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var router = express_1["default"].Router();
var JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// Zod validation schemas
var signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(6),
    firstname: zod_1.z.string().min(1),
    lastname: zod_1.z.string().min(1)
});
var signinSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(6)
});
// Sign up route
router.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedData, existingUser, hashedPassword, newUser, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                parsedData = signupSchema.parse(req.body);
                return [4 /*yield*/, db_1.User.findOne({ username: parsedData.username })];
            case 1:
                existingUser = _a.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'User already exists' })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(parsedData.password, 10)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, db_1.User.create(__assign(__assign({}, parsedData), { password: hashedPassword }))];
            case 3:
                newUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({ userid: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
                return [2 /*return*/, res.status(201).json({ message: 'User signed-up successfully', token: token })];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(400).json({ message: 'Invalid input', error: error_1 })];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Sign in route
router.post('/signin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedData, foundUser, isMatch, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                parsedData = signinSchema.parse(req.body);
                return [4 /*yield*/, db_1.User.findOne({ username: parsedData.username })];
            case 1:
                foundUser = _a.sent();
                if (!foundUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid credentials' })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].compare(parsedData.password, foundUser.password)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid credentials' })];
                }
                token = jsonwebtoken_1["default"].sign({ userid: foundUser._id }, JWT_SECRET, { expiresIn: '1h' });
                console.log("user created successfully");
                res.status(200).json({ message: 'User signin successfully', token: token });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400).json({ message: 'Invalid input', error: error_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Auth middleware
function authMiddleware(req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    jsonwebtoken_1["default"].verify(token, JWT_SECRET, function (err, user) {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        req.user = user;
        next();
    });
}
exports.authMiddleware = authMiddleware;
exports["default"] = router;
// In your main app file (e.g., index.ts or app.ts), use:
// import authRouter from './auth';
// app.use('/auth', authRouter);
