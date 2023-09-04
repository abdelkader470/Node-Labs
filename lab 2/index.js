const http = require("http");
const users = [
  {
    id: 1,
    name: "mohamed",
    age: 23,
  },
  {
    id: 2,
    name: "Ahmed",
    age: 24,
  },
  {
    id: 3,
    name: "nada",
    age: 22,
  },
];
const posts = [
  {
    pId: 1,
    title: "sport",
    likes: 200,
  },
  {
    pId: 2,
    title: "science",
    likes: 400,
  },
  {
    pId: 3,
    title: "news",
    likes: 500,
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
  //-----------------------------------------------------------
  if (req.url == "/posts" && req.method == "GET") {
    const sortPosts = posts.slice().sort((a, b) => b.pId - a.pId);
    res.end(JSON.stringify(sortPosts));
    // Add Post
  } else if (req.url == "/addPost" && req.method == "POST") {
    req.on("data", function (chunk) {
      posts.push(JSON.parse(chunk));
      res.end(JSON.stringify(posts));
    });
    // Delete post
  } else if (req.url.startsWith("/post/") && req.method == "DELETE") {
    const postId = +req.url.split("/")[2];
    const postIndex = posts.findIndex((post) => post.pId === postId);
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
      res.end(JSON.stringify(posts));
    }
    // Update User
  } else if (
    req.url.startsWith("/post/") &&
    (req.method == "PUT" || req.method == "PATCH")
  ) {
    const postId = parseInt(req.url.split("/")[2]);
    const postIndex = posts.findIndex((post) => post.pId === postId);
    if (postIndex !== -1) {
      req.on("data", function (chunk) {
        const updatedPostData = JSON.parse(chunk);
        Object.assign(posts[postIndex], updatedPostData);
        res.end(JSON.stringify(posts[postIndex]));
      });
    }
    // search By Id
  } else if (req.url.startsWith("/post/") && req.method == "GET") {
    const postId = +req.url.split("/")[2];
    const post = posts.find((post) => post.pId === postId);
    if (post) {
      res.end(JSON.stringify(post));
    }
  }
});

server.listen(3002);
//-----------------------------------------------------------
