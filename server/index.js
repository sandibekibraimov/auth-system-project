const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const dbConnect = require('./dbConnect/dbConnect');
const verifyToken = require('./middlewares/verifyToken');
const { response } = require('express');

dbConnect();

app.use(express.json());

app.get('/', (get, res) => {
  res.send('welcome auth system');
});

app.get('/api/user/profile', verifyToken, (req, res) => {
  console.log(req.user);
  res.send({
    success: true,
    data: req.user,
  });
});

app.use('/api/users', authRoutes);

app.listen(3000, () => {
  console.log('server is running');
});
