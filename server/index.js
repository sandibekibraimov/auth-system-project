const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const dbConnect = require('./dbConnect/dbConnect');

dbConnect();

app.use(express.json());

app.get('/', (get, res) => {
  res.send('welcome auth system');
});

app.use('/api/users', authRoutes);

app.listen(3000, () => {
  console.log('server is running');
});
