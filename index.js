const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
app.use(bodyParser.json());

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/serverlord', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Health Checker API');
  });
  
// To register a user
app.post('/users', async (req, res) => {
    const { userId, name } = req.body;
    try {
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ userId, name });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
});

// To add a task
app.post('/tasks', async (req, res) => {
    const { userId, taskId, taskDetails, pingUrl } = req.body;
    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const task = new Task({ taskId, taskDetails, pingUrl, status: 'pending' });
        await task.save();
        user.tasks.push(task._id);
        await user.save();
        res.status(201).json({ message: 'Task added successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Heartbeat endpoint to simulate task ping
app.post('/tasks/ping', async (req, res) => {
    const { taskId } = req.body;
    try {
        const task = await Task.findOne({ taskId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.status = 'active';
        task.lastPing = new Date();
        await task.save();
        res.status(200).json({ message: 'Task ping received' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


setInterval(async () => {
    const tasks = await Task.find();
    const currentTime = new Date();
    tasks.forEach(async (task) => {
        if ((currentTime - task.lastPing) > 30000) { 
            task.status = 'dead';
            await task.save();
        }
    });
}, 5000); // Checking every 5 seconds

// Endpoint to check task status
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
