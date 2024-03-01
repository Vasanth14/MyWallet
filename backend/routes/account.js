const authMiddleware = require("../middleware/authMiddleware");
const Account = require("../models/BankSchema");
const mongoose = require("mongoose");
const accountRouter = require("express").Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  if (!account) {
    return res.status(411).json({ message: "No account found" });
  }
  res.status(200).json({
    balance: account.balance,
  });
});

module.exports = accountRouter;
