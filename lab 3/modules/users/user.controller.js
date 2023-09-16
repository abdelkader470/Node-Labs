import userModel from "../../db/model/user.model.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  try {
    let foundedUser = await userModel.findOne({ email: req.body.email });
    if (foundedUser) {
      res.status(409).json({ Msg: "Already Resgister" });
    } else {
      let hashedPassword = bcrypt.hashSync(req.body.password, 10);
      let addedUser = await userModel.insertMany({
        ...req.body,
        password: hashedPassword,
      });
      res.status(201).json({ addedUser });
    }
  } catch (error) {
    res.status(400).json({ Msg: "error", error });
  }
};
const signIn = async (req, res) => {
  let foundedUser = await userModel.findOne({ email: req.body.email });
  if (foundedUser) {
    let matched = bcrypt.compareSync(req.body.password, foundedUser.password);
    if (matched) {
      res.status(200).json({ Msg: "login Successfully", foundedUser });
    } else {
      res.status(400).json({ Msg: "Wrong Password" });
    }
  } else {
    res.status(404).json({ Msg: "User Not Found, U Have To Resgister First" });
  }
};
// const signIn = async (req, res) => {
//   let { email, password } = req.body;
//   if (!email && !password) {
//     res.json({ error: "Write email and password" });
//   }
//   try {
//     let user = await userModel.findOne({ email: email });
//     if (!user) {
//       return res.json({ error: "Invalid email or password." });
//     }
//     if (user.password !== password) {
//       return res.json({ error: "Invalid email or password." });
//     }
//     res.json({ message: "SignIn Done", user });
//   } catch {
//     console.error("sign-in Error", error);
//   }
// };
const updateUser = async (req, res) => {
  let { id } = req.params;
  let updatedUser = await userModel.findByIdAndUpdate(
    id,
    {
      userName: req.body.userName,
      password: req.body.password,
      age: req.body.age,
      phone: req.body.phone,
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
