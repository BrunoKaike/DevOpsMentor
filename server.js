const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const devOpsLearningPointsRouter = require('./routes/devOpsLearningPointRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());

// Configuração para carregar arquivos estáticos
app.use(express.static('public'));

app.use('/devops-learning-points', devOpsLearningPointsRouter);
app.use('/user', userRoutes);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
