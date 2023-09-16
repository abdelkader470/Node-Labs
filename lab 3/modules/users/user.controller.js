import userModel from "../../db/model/user.model.js";

const signUp = async (req, res) => {
  let addUser = await userModel.insertMany(req.body);
  res.json(addUser);
};
const signIn = async (req, res) => {
  let { email, password } = req.body;
  if (!email && !password) {
    res.json({ error: "Write email and password" });
  }
  try {
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ error: "Invalid email or password." });
    }
    if (user.password !== password) {
      return res.json({ error: "Invalid email or password." });
    }
    res.json({ message: "SignIn Done", user });
  } catch {
    console.error("sign-in Error", error);
  }
};
const updateUser = async (req, res) => {
  let { id } = req.params;
  let updatedUser = await userModel.findByIdAndUpdate(
    id,
    {
      userName: req.body.userName,
    },
    { new: true }
  );
  res.json({ updatedUser });
};
const deleteUser = async (req, res) => {
  let { id } = req.params;
  let deletedUser = await userModel.findByIdAndDelete(id);
  res.json({ deletedUser });
};
const getAllUser = async (req, res) => {
  const allData = await userModel.find();
  res.json({ msg: "Hello", allData });
};
const searchByAge = async (req, res) => {
  const { minAge, maxAge } = req.params;
  try {
    const users = await userModel.find({
      age: { $gte: parseInt(minAge), $lte: parseInt(maxAge) },
    });
    res.json({ users });
  } catch (err) {
    res.status(409).json({ err: "error" });
  }
};
const searchByNameAndAge = async (req, res) => {
  const { nameStart, age } = req.params;
  try {
    const users = await userModel.find({
      userName: { $regex: `^${nameStart}`, $options: "i" },
      age: { $lte: parseInt(age) },
    });
    if (!users[0]) {
      res.json({ Msg: "User Not Found" });
    } else {
      res.json({ users });
    }
  } catch (err) {
    res.status(409).json({ err: "error" });
  }
};

export {
  getAllUser,
  signUp,
  signIn,
  updateUser,
  deleteUser,
  searchByAge,
  searchByNameAndAge,
};
