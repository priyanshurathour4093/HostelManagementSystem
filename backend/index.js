const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectToMongo = require('./db/connect.js');
const GroupModel = require('./models/GroupModel.js');
const MessageModel = require('./models/MessageModel.js');
const auth = require('./routes/auth.routes.js');
require('dotenv').config();

connectToMongo();

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
    res.send("---");
});

// Handle user authentication routes
app.use("/api/auth", auth);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New Socket connection:', socket.id);

    socket.on('joinGroup', async (group_id) => {
        // Join the group room
        socket.join(group_id);
        console.log(`Socket ${socket.id} joined group ${group_id}`);
    });

    socket.on('message', async (data) => {
        try {
            const { message, group_id, user_id} = data;
            console.log(user_id);
            // Check if user_id is present
            if (!user_id || !user_id._id) {
                throw new Error('User ID or _id is missing');
            }
    
            // Save message to MongoDB
            const group = await GroupModel.findOne({ group_id: group_id });
            if (!group) {
                throw new Error('Group not found');
            }
            const newMessage = new MessageModel({
                group_id,
                message,
                user_id:user_id._id
            });

           
            
            // Save the new message to get the generated ID
            const savedMessage = await newMessage.save();
            
            // Push the generated message ID to the group's messages array
            group.messages.push(savedMessage._id);
            
            // Save the group document with the updated messages array
            await group.save();
            
            // Log sender and receiver addresses
            console.log(`Message received from sender: ${user_id._id} to group: ${group_id}`);
            
            // Broadcast the message to all other clients in the group room
            socket.to(group_id).emit('message', { message, user_id: user_id });
            
            // Log sender and receiver addresses
            console.log(`Message sent from sender: ${user_id} to group: ${group_id}`);
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });
    
    

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
