import { nomCookie } from "../../lib/auth.js";

export default async function handler(req, res) {
  res.setHeader("Set-Cookie", `${nomCookie()}=; Path=/; HttpOnly; Max-Age=0`);
  res.status(200).json({ ok: true });
}
