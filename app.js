const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("login", (data) => {
    const { name, userId } = data;

    console.log("Client logged-in: \n name:" + name + "\n userId: " + userId);

    socket.name = name;
    socket.userId = userId;

    io.emit("login", data.name);
  });

  socket.on("chat", (data) => {
    console.log(`Message from ${data.from.name}: ${data.msg}`);

    const msg = {
      from: data.from,
      msg: data.msg,
    };

    socket.broadcast.emit("chat", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.name}`);
  });
});

server.listen(8080, () => {
  console.log("Socket IO Server listening on Port 8080");
});
