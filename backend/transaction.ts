// filepath: ts-backend-app/transaction.ts
import { Router, Request, Response } from 'express';
import { Transaction } from './db';
import { authMiddleware } from './auth';

const router = Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const sortBy = req.query.sortBy as string || 'date';
        const order = req.query.order === 'asc' ? 1 : -1;
        const search = req.query.search as string || '';
        const allowedSortFields = ['date', 'amount', 'category', 'status', 'user_id'];
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'date';

        // Build search filter
        let filter: any = {};
        if (search) {
            filter = {
                $or: [
                    { user_id: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                    { status: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const transactions = await Transaction.find(filter).sort({ [sortField]: order });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
});

export default router;