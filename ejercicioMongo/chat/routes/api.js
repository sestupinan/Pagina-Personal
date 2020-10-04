var express = require("express");
var router = express.Router();
const ws = require("../wslib");

const Joi = require("joi");
const Message = require("../models/message");
const mdbconn = require("../lib/utils/mongo.js");
var [
  getMessages,
  insertMessage,
  getOneMessage,
  deleteMessage,
  updateMessage,
] = require("../controllers/messages");

const validateMessage = (messag) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .pattern(/^[a-zA-Z]+\s[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .required(),
    ts: Joi.string().required(),
  });

  return schema.validate(messag);
};

/* GET all messages. */
router.get("/messages", async function (req, res, next) {
  const messages = await getMessages();
  res.send(messages);
});

/* GET given message. */
router.get("/messages/:ts", async (req, res) => {
  const message = await getOneMessage(req.params.ts);
  res.send(message);
});

/* POST given message. */
router.post("/messages", async (req, res) => {
  const { error } = validateMessage(req.body);
  const newMessage = await insertMessage(req.body);
  res.send(newMessage);
});

/* UPDATE given message. */
router.put("/messages/:ts", async (req, res) => {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const newMessage = await updateMessage(req.body, req.params.ts);
  res.send(newMessage);
  ws.sendMessages;
});

/* DELETE given message. */
router.delete("/messages/:ts", async (req, res) => {
  const newMessage = await deleteMessage(req.params.ts);
  res.send(newMessage);
  ws.sendMessages;
});

module.exports = router;
