const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require('../middleware/AuthMiddleware');

const { sign } = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await Users.findOne({ where: { username: username } });
  if (existingUser) {
    res.json({
      type: ' error',
      message: 'Usuario ja existe'
    })
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json({
        type: 'success',
        message: 'Usuario criado com sucesso',
      });
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    return res.json({ error: 'Usuario nao encontrado' });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ error: 'Senha incorreta' })
    } else {
      const accessToken = sign({ username: user.username, id: user.id },
        "importantsecret"
      );
      return res.json(accessToken);
    }
  });
});

router.get('/info', validateToken, async (req, res) => {
  const user = req.user.validToken;
  console.log(user);
  return res.json(user);
});

module.exports = router;