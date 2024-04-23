const express = require('express');
const { getHeathCheck } = require('../controller/heath.controller');
const heathRouter = express.Router();

console.log("inside route")
heathRouter.post("/check", getHeathCheck)

module.exports = { heathRouter };