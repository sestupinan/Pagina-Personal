const WebSocket = require("ws");
var express = require("express");
var router = express.Router();
const Message = require("./models/message");
const Joi = require("joi");
const mdbconn = require('./lib/utils/mongo.js');

const clients = [];
var messages = [];
Message.findAll().then((result) => {
  messages = result;
});

function refresh() {
  return Message.findAll();
}

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

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      var msg = message.split(";");
      console.log(msg);
      mes = new Message();
      mes.message = msg[0];
      mes.author = msg[1];
      mes.ts = msg[2];
      let jsn = JSON.stringify(mes);
      //const { error } = validateMessage(jsn);
      //if (error) {
      //  console.log("Error en formato");
      //  return new Error(error);
      //}

      Message.create({
        message: mes.message,
        author: mes.author,
        ts: mes.ts,
      }).then((result) => {
        console.log("Exito");
        sendMessages();
      });
      console.log("Se deberia act")
    });
  });
};

const sendMessages = () => {
  refresh().then((result) => {
    messages = result;
  });
  clients.forEach((client) => {
    client.send(JSON.stringify(messages));
  });
};

exports.wsConnection = wsConnection;
exports.sendMessages = sendMessages;
