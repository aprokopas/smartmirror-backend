import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Expected format: "Bearer <token>"
  const parts = token.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const jwtToken = parts[1];

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded;   // { id: userId }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid or expired" });
  }
}
