const { func } = require('joi');
const mdbconn = require('../lib/utils/mongo.js');

function getMessages() {
  return mdbconn.conn().then((client) => {
    return client.db('chat').collection('messages').find({}).toArray();
  });
}

function getOneMessage(pts) {
    return mdbconn.conn().then((client) => {
      return client.db('chat').collection('messages').findOne({'ts':pts})
    }).catch((err, doc) =>{
        console.log("Error de GET");
        console.log(err);
    });
  }

function insertMessage(message) {
  return mdbconn.conn().then((client) => {
    return client.db('chat').collection('messages').insertOne(message); // Si no se provee un ID, este será generado automáticamente
  });
}

function updateMessage(message, pts) {
  console.log("message: " + JSON.stringify(message));
  console.log("timestamp: " + pts);

    return mdbconn.conn().then((client) => {
        return client.db("chat")
          .collection("messages")
          .updateOne(
            {'ts':pts}, // Filtro al documento que queremos modificar
            { $set: message } // El cambio que se quiere realizar
          )
        }).catch((err, doc) =>{
          console.log("Error de PUT");
          console.log(err);
      });
}

function deleteMessage(pts){
    return mdbconn.conn().then((client) => {
        return client.db("chat")
          .collection("messages")
          .deleteOne(
            { ts: pts  }
          )
        }).catch((err, doc) =>{
          console.log("Error de DELETE");
          console.log(err);
      });
}

module.exports = [getMessages, insertMessage, getOneMessage, deleteMessage, updateMessage];