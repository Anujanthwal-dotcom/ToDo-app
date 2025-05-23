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
        console.log(savedUser);
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


export default router;