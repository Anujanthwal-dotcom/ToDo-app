import express from 'express';
import User from '../models/user.js';
import List from '../models/list.js';

const router = express.Router();

router.post("/addTask", async (req, res) => {
    try {
        const { title, body, priority, dueDate} = req.body;
        const email = req.user.email;
        const dbUser = await User.findOne({email});
        
        if(!dbUser) {
            return res.status(400).json({ message: 'User do not exist' });
        }

        const list = new List({
            title,
            body,
            priority,
            dueDate,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: dbUser._id,
        });
        

        const savedList = await list.save();
        dbUser.todo.push(savedList);
        const savedUser = await dbUser.save();
        res.status(200).json({ savedList });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Cannot add task' });
    }
});

router.put('/updateTask/:id', async (req, res) => {
    try {
        const { title, body, priority, dueDate} = req.body;

        const updatedList = await List.findByIdAndUpdate(req.params.id, {
            title,
            body,
            priority,
            dueDate,
            updatedAt: new Date()
        }, { new: true });

        if(!updatedList) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully' });

    } catch (error) {
        res.status(400).json({ message: 'Cannot update task' });
    }
});

router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const email = req.user.email;
        const dbUser = await User.findOne({email});

        if(!dbUser) {   
            return res.status(400).json({ message: 'User do not exist' });
        }

        await List.findByIdAndDelete(req.params.id);
        dbUser.todo.pull(req.params.id);    
        await dbUser.save();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Cannot delete task' });
    }
});

router.get('/getTasks/', async (req, res) => {    
    try {
        const dbUser = await User.findOne({email: req.user.email});
        if(!dbUser) {
            return res.status(400).json({ message: 'User do not exist' });
        }
        const list = dbUser.todo;
        const lists = await List.find({ _id: { $in: list } }).sort({ createdAt: -1 });
        res.status(200).json({ lists });
    } catch (error) {
        res.status(400).json({ message: 'Cannot get tasks' });
    }
});

router.get('/getTodayTasks', async (req, res)=>{

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of the day
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); // Set to start of
        const lists = await List.find({
            user: req.user._id,
            dueDate: {
                $gte: today,
                $lt: tomorrow
            }
        }).sort({ createdAt: -1 });
        res.status(200).json({ lists });
    } catch (error) {
        res.status(400).json({ message: 'Cannot get tasks' });
    }
});

router.get('/getLatestTasks', async (req, res)=>{
    try {
        const lists = await List.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });
        res.status(200).json({ lists });
    } catch (error) {
        res.status(400).json({ message: 'Cannot get tasks' });
    }
});

router.get('/getHighPriorityTasks', async (req, res)=>{
    try {
        const lists = await List.find({
            user: req.user._id,
            priority: 'high'
        }).sort({ createdAt: -1 });
        res.status(200).json({ lists });
    } catch (error) {
        res.status(400).json({ message: 'Cannot get tasks' });
    }
});

router.get('/getMediumPriorityTasks', async (req, res)=>{
    try {
        const lists = await List.find({
            user: req.user._id,
            priority: 'medium'
        }).sort({ createdAt: -1 });
        res.status(200).json({ lists });
    } catch (error) {
        res.status(400).json({ message: 'Cannot get tasks' });
    }
});

router.get('/getLowPriorityTasks', async (req, res)=>{
    try {
        const lists = await List.find({
            user: req.user._id,
            priority: 'low'
        }).sort({ createdAt: -1 });
        res.status(200).json({ lists });
    } catch (error) {
        res.status(400).json({ message: 'Cannot get tasks' });
    }
});



export default router;