import jwt from 'jsonwebtoken'
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error('Token not found');
    return res.sendStatus(401); // If no token, return 401 Unauthorized
  }
  
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err){
      console.error('JWT verification error:', err);
       return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
export default authMiddleware;