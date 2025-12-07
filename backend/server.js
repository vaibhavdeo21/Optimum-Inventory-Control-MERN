const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const SparePart = require('./models/SparePart');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventory_optimum')
  .then((conn) => console.log(`MongoDB Connected: ${conn.connection.host}`))
  .catch(err => console.log(err));

// 2. GET: Fetch all items
app.get('/api/spares', async (req, res) => {
  try {
    const spares = await SparePart.find();
    res.json(spares);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. POST: Add a new item (First time registration)
app.post('/api/spares', async (req, res) => {
  const spare = new SparePart(req.body);
  try {
    const newSpare = await spare.save();
    res.status(201).json(newSpare);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. PATCH: Consume stock (Dispatch/Decrease)
app.patch('/api/spares/:id/consume', async (req, res) => {
  try {
    const spare = await SparePart.findById(req.params.id);
    if (req.body.quantity > spare.currentStock) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    spare.currentStock -= req.body.quantity;
    await spare.save();
    res.json(spare);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. PATCH: Restock (Incoming Stock/Increase)
app.patch('/api/spares/:id/restock', async (req, res) => {
  try {
    const spare = await SparePart.findById(req.params.id);
    spare.currentStock += parseInt(req.body.quantity); 
    await spare.save();
    res.json(spare);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.delete('/api/spares/:id', async (req, res) => {
  try {
    await SparePart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));