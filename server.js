const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Task = require('./models/Task');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// API Endpoints
// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task({ name: req.body.name });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Random Quotes API
const quotes = [
  "The best way to predict the future is to invent it.",
  "Life is what happens when you're busy making other plans.",
  "You only live once, but if you do it right, once is enough.",
  "Be the change that you wish to see in the world.",
  "The only way to do great work is to love what you do.",
];

app.get('/api/quotes', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
