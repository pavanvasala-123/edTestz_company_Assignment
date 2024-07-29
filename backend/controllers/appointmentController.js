const Appointment = require("../models/Appointment");

exports.bookAppointment = async (req, res) => {
  const { date } = req.body; // Extract the date from the request body
  const userId = req.user.userId; // Get the authenticated user's ID from the middleware
  console.log(userId);

  // Validate the date
  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }

  try {
    // Check for conflicting appointments
    const existingAppointment = await Appointment.findOne({
      where: { date, userId },
    });
    if (existingAppointment) {
      return res.status(400).json({ error: "Appointment conflict" });
    }

    // Create a new appointment
    const newAppointment = await Appointment.create({ date, userId });
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

exports.getAppointments = async (req, res) => {
  const userId = req.user.userId;
  try {
    const appointments = await Appointment.findAll({ where: { userId } });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};
