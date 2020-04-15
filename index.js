const express = require('express');
const path = require('path');
const db = require('./db/db');

const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const resultsRoutes = require('./routes/results');

const app = express();

db.authenticate().then(() => console.log('Database connected...'))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/results', resultsRoutes);

const PORT = process.env.PORT || 3000;

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
start();
