const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/appointments', authMiddleware, appointmentController.bookAppointment);
router.get('/appointments', authMiddleware, appointmentController.getAppointments);

module.exports = router;
