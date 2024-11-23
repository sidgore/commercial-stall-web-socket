const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this to your allowed front-end URLs
  },
});

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("WebSocket server is running");
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle incoming messages
  socket.on("message", (data) => {
    console.log("Received message:", data);

    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
