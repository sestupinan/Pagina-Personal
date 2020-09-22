var express = require('express');
var router = express.Router();
const ws = require('../wslib')

const Joi = require("joi");
const Message = require("../models/message");

const validateMessage = (messag) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string().pattern(/^[a-zA-Z]+\s[a-zA-Z]+(\s[a-zA-Z]+)*$/).required(),
    ts: Joi.string().required(),
  });

  return schema.validate(messag);
};

/* GET all messages. */
router.get('/messages', function(req, res, next) {
  Message.findAll().then((result) => {
    res.send(result);
  });
});

/* GET given message. */
router.get("/messages/:ts", (req, res) => {
  Message.findAll({
    where: {
      ts: req.params.ts
    }
  }).then((response) => {
    if (response === null || response.length===0)
      return res
        .status(404)
        .send("The Message with the given ts was not found.");
    res.send(response);
  });
  
});

/* POST given message. */
router.post("/messages", (req, res) => {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.create({ message: req.body.message, author: req.body.author, ts: req.body.ts }).then(
    (result) => {
      res.send(result);
    }
  );
  ws.sendMessages;

});

/* UPDATE given message. */
router.put("/messages/:ts", (req, res) => {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.update(req.body, { where: { ts: req.params.ts } }).then((response) => {
    if (response[0] !== 0) res.send({ message: "Message updated" });
    else res.status(404).send({ message: "Message was not found" });
  });
  ws.sendMessages;

});

/* DELETE given message. */
router.delete("/messages/:ts", (req, res) => {
  Message.destroy({
    where: {
      ts: req.params.ts,
    },
  }).then((response) => {
    if (response === 1) res.status(204).send();
    else res.status(404).send({ message: "Message was not found" });
  });
  ws.sendMessages;

});

module.exports = router;