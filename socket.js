const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  var room = ""
  // When the client joins a room
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    room = roomId
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
  });
  // when the client sends a massage
  socket.on("message", (data) => {
    console.log(data, "DATA");
    console.log(socket.rooms)
    //This will send a message to a specific room ID
    socket.in(data.room).emit("message", {msg: data.data, uname: data.name});
  });
  // When the client disconnects from the server
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});