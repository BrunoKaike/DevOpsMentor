const express = require('express');
const fs = require('fs');
const DevOpsLearningPoint = require('../models/devOpsLearningPoint');

const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('./dao/devOpsLearningPoints.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao ler os dados.');
            return;
        }
        res.json(JSON.parse(data));
    });
    
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
  
    fs.readFile('./dao/devOpsLearningPoints.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      let devOpsLearningPoints = JSON.parse(data);
  
      const index = devOpsLearningPoints.findIndex(point => point.Number === id);
  
      if (index === -1) {
        return res.status(404).json({ error: 'DevOps Learning Point não encontrado.' });
      }
  
      devOpsLearningPoints.splice(index, 1);
  
      fs.writeFile('./dao/devOpsLearningPoints.json', JSON.stringify(devOpsLearningPoints, null, 2), err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.json({ message: 'DevOps Learning Point deletado com sucesso.' });
      });
    });
  });

  router.put('/status/:id/:status', (req, res) => {
    const id = parseInt(req.params.id);
    const status = req.params.status;
  
    fs.readFile('./dao/devOpsLearningPoints.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      let devOpsLearningPoints = JSON.parse(data);
  
      const index = devOpsLearningPoints.findIndex(point => point.Number === id);
  
      if (index === -1) {
        return res.status(404).json({ error: 'DevOps Learning Point não encontrado.' });
      }
      
      devOpsLearningPoints[index].Status = status;
  
      fs.writeFile('./dao/devOpsLearningPoints.json', JSON.stringify(devOpsLearningPoints, null, 2), err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.json({ message: 'DevOps Learning Point rejeitado com sucesso.' });
      });
    });
  });

  router.post('/cadastro', (req, res) => {
    const newLearningPoint = req.body;
  
    fs.readFile('./dao/devOpsLearningPoints.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      let devOpsLearningPoints = JSON.parse(data);
      const lastId = devOpsLearningPoints.length > 0 ? devOpsLearningPoints[devOpsLearningPoints.length - 1].Number : 0;

      const newId = lastId + 1;
  
      const learningPoint = {
        Number: newId,
        Theme: newLearningPoint.theme,
        Descricao: newLearningPoint.descricao,
        DevOpsSpecific: newLearningPoint.devopsSpecific,
        Links: 0,
        Type: newLearningPoint.type,
        Status: "pendig"
      };
  
      devOpsLearningPoints.push(learningPoint);
  
      fs.writeFile('./dao/devOpsLearningPoints.json', JSON.stringify(devOpsLearningPoints, null, 2), err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.json({ message: 'DevOps Learning Point criado com sucesso.', id: newId });
      });
    });
  });



module.exports = router;
