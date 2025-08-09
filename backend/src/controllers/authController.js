import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/tokenUtils.js";

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      email: email.toLowerCase(),
      password_hash,
    });

    const token = generateToken(user);
    return res
      .status(201)
      .json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    return res
      .status(200)
      .json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
