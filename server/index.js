import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from "./routes/auth";
import messageRoutes from "./routes/messages";
import socket from "socket.io";
import path from 'path';
import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());



mongoose.connect("mongodb+srv://kashyap:Kp@24698@cluster0.mfu4ojl.mongodb.net/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

//Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//Serve static assets if in production
// if(process.env.NODE_ENV === 'production'){
  //Set static filder
  app.use(express.static('public/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  }); 
// }

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
