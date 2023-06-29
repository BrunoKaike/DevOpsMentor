const express = require('express');
const fs = require('fs');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

router.post('/cadastro', (req, res) => {
    const newUser = req.body;
  
    fs.readFile('./dao/users.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      let users = JSON.parse(data);
      const lastId = users.length > 0 ? users[users.length - 1].Id : 0;

      const newId = lastId + 1;
  
      const user = {
        ID: newId,
        Name: newUser.name,
        Email: newUser.email,
        Password: newUser.password,
        Role: "client"
      };
  
      users.push(user);
  
      fs.writeFile('./dao/users.json', JSON.stringify(users, null, 2), err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.json({ message: 'DevOps Learning Point criado com sucesso.', id: newId });
      });
    });
  });

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    fs.readFile('./dao/users.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      const users = JSON.parse(data);
  
      const user = users.find(u => u.Email === email);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
  
      if (user.Password !== password) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }
  
      res.json({ message: 'Login bem-sucedido.', user: user });
    });
  });

  module.exports = router;