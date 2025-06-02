---
title: "Transactions in Mongoose"
date: "Jun 2, 2025"
readTime: "3 min"
---

# Transactions in Mongoose

Recently, I was building a Paytm clone–kind of project, just to understand how things work under the hood, you know. Because when it comes to handling money, it’s super important to get things right. Best practices are preferred — and reinforced — because any flaws can end up costing millions.

Now, when dealing with online money transfers, one common problem people face is network issues — either on the sender’s side, the bank’s side, or the receiver’s side. Because of this, sometimes money gets deducted from the sender’s account, but the receiver doesn’t get it. This is where the transaction process becomes important to make sure everything goes smoothly.

To tackle these kinds of issues, developers like me use transactions, which help maintain consistency and prevent partial updates (just like the situation we talked about earlier). This almost guarantees consistency across the system.

If I say it in slightly more technical terms: transactions ensure that multiple operations on your MongoDB database either all succeed or all fail, helping maintain the consistency and integrity of your data.

The coding part is also pretty easy — especially if you’ve worked with MongoDB before.

```ts
import express, { Response, Request } from "express";
import { UserMiddleware } from "../middleware";
import { AccountModel } from "../db";
import mongoose from "mongoose";

const router = express.Router();

// Dummy route for testing
router.get("/accountroutes", (req: Request, res: Response) => {
  res.status(200).json({ message: "Dummy route for account" });
});

// Route to get user balance
router.get("/balance", UserMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const account = await AccountModel.findOne({ userId: req.userId });

    if (!account) {
      res.status(404).json({ message: "Account not found for the user" });
      return;
    }

    res.status(200).json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong in the backend", error });
  }
});

// Route to transfer money between accounts
router.post("/transfer", UserMiddleware, async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    const fromAccount = await AccountModel.findOne({ userId: req.userId }).session(session);

    if (!fromAccount) {
      await session.abortTransaction();
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (fromAccount.balance < amount) {
      await session.abortTransaction();
      res.status(400).json({ message: "Insufficient balance" });
      return;
    }

    const toAccount = await AccountModel.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      res.status(400).json({ message: "Invalid account" });
      return;
    }

    await AccountModel.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await AccountModel.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    res.status(200).json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Something serious went wrong", error });
  } finally {
    session.endSession();
  }
});

export default router;

```



⚠️ Note
This might look simple at first glance — but here’s the catch: MongoDB transactions are a relatively new feature in Mongoose, and they can be tricky to implement correctly.

If you're running into issues (like the infamous transaction errors), you're not alone. Here's a helpful link that explains one such problem:

🔗 MongoError: Transaction numbers are only allowed on a replica set member or mongos

💡 Tip: Transactions only work if you're using a replica set. If you're working locally, you might need to initiate your MongoDB instance with replica set support.

