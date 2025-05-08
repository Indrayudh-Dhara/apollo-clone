const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/apollo-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  city: String,
  experience: Number,
  fees: Number,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

// POST /add-doctor
app.post('/add-doctor', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /list-doctor-with-filter
app.get('/list-doctor-with-filter', async (req, res) => {
  const { page = 1, limit = 10, city, experience } = req.query;
  const filter = {};
  if (city) filter.city = city;
  if (experience) filter.experience = { $gte: parseInt(experience) };

  try {
    const doctors = await Doctor.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Doctor.countDocuments(filter);
    res.json({ doctors, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


