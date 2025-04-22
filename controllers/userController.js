import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password, bio } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, bio });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user, req.body, { new: true });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user);
  res.json({ message: "User deleted" });
};
