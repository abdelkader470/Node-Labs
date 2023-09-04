const express = require("express");
let users = [
  { id: 1, name: "omar", age: 20 },
  { id: 2, name: "ahmed", age: 21 },
  { id: 3, name: "nade", age: 22 },
];
let posts = [
  { id: 1, title: "sport", likes: 600 },
  { id: 2, title: "news", likes: 300 },
  { id: 3, title: "art", likes: 500 },
];
const app = express();
app.use(express.json());
// ===============GET All Users====================
app.get("/users", (req, res) => {
  res.json(users);
});
//==================sorted by name==================
app.get("/sortUsers", (req, res) => {
  users.sort((a, b) => a.name.localeCompare(b.name));
  res.json(users);
});
// =============search user by id===================
app.get("/users/:userId", (req, res) => {
  const userId = +req.params.userId;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.status(404).json({ msg: "User Not Found" });
  }
  res.json(user);
});
//===============Add user===========================
app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.json({ Error: "Plase Enter name" });
  }
  if (!req.body.age) {
    return res.json({ Error: "Plase Enter age" });
  }
  users.push({ id: users.length + 1, ...req.body });
  res.json(users);
});
//===============update user===========================
app.patch("/users/:userId", (req, res) => {
  const userId = +req.params.userId;
  let user = users.find((user) => user.id === userId);
  if (!user) {
    res.status(404).json({ msg: "User Not Found" });
  }
  user = { ...user, ...req.body };
  res.json(user);
});
//=====================delete user======================
app.delete("/users/:userId", (req, res) => {
  const userId = +req.params.userId;
  users = users.filter((user) => user.id !== userId);
  res.json(users);
});
/*
=======================================================
*
* Post end points
*
=======================================================
*/
// ===============GET All posts====================
app.get("/posts", (req, res) => {
  res.json(posts);
});
//==================sorted by id==================
app.get("/sortPosts", (req, res) => {
  posts.sort((a, b) => b.id - a.id);
  res.json(posts);
});
// =============search post by id===================
app.get("/posts/:postId", (req, res) => {
  const postId = +req.params.postId;
  const post = users.find((post) => post.id === postId);
  if (!post) {
    res.status(404).json({ msg: "Post Not Found" });
  }
  res.json(post);
});
//===============Add post===========================
app.post("/posts", (req, res) => {
  if (!req.body.title) {
    return res.json({ Error: "Plase Enter title" });
  }
  if (!req.body.likes) {
    return res.json({ Error: "Plase Enter likes" });
  }
  posts.push({ id: posts.length + 1, ...req.body });
  res.json(posts);
});
//===============update post===========================
app.patch("/posts/:postId", (req, res) => {
  const postId = +req.params.postId;
  let post = posts.find((post) => post.id === postId);
  if (!post) {
    res.status(404).json({ msg: "Post Not Found" });
  }
  post = { ...post, ...req.body };
  res.json(post);
});
//=====================delete post======================
app.delete("/posts/:postId", (req, res) => {
  const postId = +req.params.postId;
  posts = posts.filter((post) => post.id !== postId);
  res.json(posts);
});
//=======================================================

app.listen("4000", () => {
  console.log("listen to port 4000");
});
