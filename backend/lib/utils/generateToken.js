import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
  const token =  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d"
  })
  
  res.cookie("jwt", token, {
  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  httpOnly: true, // prevents client-side JavaScript from accessing the cookie. i.e XSS attack
  sameSite: "strict", // prevents CSRF attacks
  secure: process.env.NODE_ENV === "production", // cookie will only be sent over HTTPS in production
})
};