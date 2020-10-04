var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* POST given message. */
router.post("/", (req, res) => {
  
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.create({ message: req.body.message, author: req.body.author, ts: req.body.ts }).then(
    (result) => {
      res.send(result);
    }
  );
});
