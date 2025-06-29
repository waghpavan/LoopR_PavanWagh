// filepath: ts-backend-app/auth.ts
import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from './db';
import dotenv from 'dotenv';


dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Zod validation schemas
const signupSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
});

const signinSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
});

// Sign up route
router.post('/signup', async (req: Request, res: Response):Promise<any> => {
    try {
        const parsedData = signupSchema.parse(req.body);
        const existingUser = await User.findOne({ username: parsedData.username });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(parsedData.password, 10);
        const newUser = await User.create({
            ...parsedData,
            password: hashedPassword
        });
        const token = jwt.sign({ userid: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
         return res.status(201).json({ message: 'User signed-up successfully', token });
    } catch (error) {
        return res.status(400).json({ message: 'Invalid input', error });
    }
});

// Sign in route
router.post('/signin', async (req: Request, res: Response):Promise<any> => {
    try {
        const parsedData = signinSchema.parse(req.body);
        const foundUser = await User.findOne({ username: parsedData.username });

        if (!foundUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(parsedData.password, foundUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userid: foundUser._id }, JWT_SECRET, { expiresIn: '1h' });
                console.log("user created successfully");

        res.status(200).json({ message: 'User signin successfully', token });
    } catch (error) {
        res.status(400).json({ message: 'Invalid input', error });
    }
});

// Auth middleware
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        (req as any).user = user;
        next();
    });
}

export default router;

// In your main app file (e.g., index.ts or app.ts), use:
// import authRouter from './auth';
// app.use('/auth', authRouter);