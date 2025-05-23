import express from 'express';
import User from '../models/user.js';
import List from '../models/list.js';

const router = express.Router();

router.post("/addTask", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const dbUser = await User.findOne({email});

        if(!dbUser) {
            return res.status(400).json({ message: 'User do not exist' });
        }

        const list = new List({
            title,
            body,
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
        const { title, body, email } = req.body;
        const dbUser = await User.findOne({email});

        if(!dbUser) {   
            return res.status(400).json({ message: 'User do not exist' });
        }

        const list = await List.findByIdAndUpdate(req.params.id, {
            title,
            body,
        });

        await list.save();
        res.status(200).json({ message: 'Task updated successfully' });

    } catch (error) {
        res.status(400).json({ message: 'Cannot update task' });
    }
});

router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const { email } = req.body;
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

router.get('/getTasks/:email', async (req, res) => {    
    try {
        const dbUser = await User.findOne({email: req.params.email});
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

router.get('/getTask/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        if(!list) {
            return res.status(400).json({ message: 'Task do not exist' });
        }
        
        res.status(200).json({ list });
    } catch (error) {
        res.status(400).json({ message: 'Cannot get task' });
    }
});



export default router;