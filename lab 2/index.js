const http = require("http");
const users = [
  {
    id: 2,
    name: "mohamed",
    age: 23,
  },
  {
    id: 1,
    name: "Ahmed",
    age: 24,
  },
  {
    id: 3,
    name: "nada",
    age: 22,
  },
];
const server = http.createServer((req, res) => {
  // Get All Users And Sort By Name
  if (req.url == "/users" && req.method == "GET") {
    const sortedUsers = users
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    res.end(JSON.stringify(sortedUsers));
    // Add User
  } else if (req.url == "/addUser" && req.method == "POST") {
    req.on("data", function (chunk) {
      users.push(JSON.parse(chunk));
      res.end(JSON.stringify(users));
    });
    // Delete User
  } else if (req.url.startsWith("/user/") && req.method == "DELETE") {
    const userId = +req.url.split("/")[2];
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.end(JSON.stringify(users));
    }
    // Update User
  } else if (
    req.url.startsWith("/user/") &&
    (req.method == "PUT" || req.method == "PATCH")
  ) {
    const userId = parseInt(req.url.split("/")[2]);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      req.on("data", function (chunk) {
        const updatedUserData = JSON.parse(chunk);
        Object.assign(users[userIndex], updatedUserData);
        res.end(JSON.stringify(users[userIndex]));
      });
    }
    // search By Id
  } else if (req.url.startsWith("/user/") && req.method == "GET") {
    const userId = +req.url.split("/")[2];
    const user = users.find((user) => user.id === userId);
    if (user) {
      res.end(JSON.stringify(user));
    }
  }
});

server.listen(3002);
