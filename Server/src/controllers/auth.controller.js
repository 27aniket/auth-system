import User from "../models/User.js";
import redis from "../config/redis.js";
import { signAccess, signRefresh } from "../utils/jwt.js";
import { hash, compare } from "../utils/hash.js";
import { v4 as uuid } from "uuid";

export const register = async (req, res) => {
  const user = await User.create({
    ...req.body,
    password: await hash(req.body.password),
  });
  res.json(user);
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.sendStatus(401);

  const ok = await compare(req.body.password, user.password);
  if (!ok) return res.sendStatus(401);

  const access = signAccess({ id: user._id });
  const refresh = signRefresh({ id: user._id, jti: uuid() });

  await redis.set(refresh, user._id, "EX", 60 * 60 * 24 * 14);

  res.cookie("refresh", refresh, { httpOnly: true });
  res.json({ access });
};

export const me = async (req, res) => {
  res.json(await User.findById(req.user.id).select("-password"));
};

export const logout = async (req, res) => {
  const token = req.cookies?.refresh;
  if (token) await redis.del(token);
  res.clearCookie("refresh");
  res.sendStatus(200);
};
