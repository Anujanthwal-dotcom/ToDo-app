import cron from 'node-cron';
import List from '../models/list.js';
import User from '../models/user.js';
import Mailer from '../mailservice/Mailer.js';


const NotificationJob = async () => {
    const allUsersTasks = await List.find({});
    
    for(const task of allUsersTasks){
        if(task.dueDate.toDateString() === Date.now().toDateString()){
            const userId = task.user;
            const dbUser = await User.findById({user:userId});

            if(dbUser){
                const email = dbUser.email;
                const subject = `Task Reminder: ${task.title}`;
                const text = `This is a reminder for your task: ${task.title}. \n\nDetails: ${task.body}\n\nDue Date: ${task.dueDate.toDateString()}`;
                
                try {
                    await Mailer.sendMail(email, subject, text);
                    console.log(`Notification sent to ${email} for task: ${task.title}`);
                } catch (error) {
                    console.error(`Failed to send notification to ${email} for task: ${task.title}`, error);
                }
            }
        }
    }
}

cron.schedule('0 7 * * *', NotificationJob);