const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./Routes/authRoutes');
const appointmentRoutes = require('./Routes/appointmentRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', appointmentRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.log('Error syncing database', error);
  });

module.exports = app;
