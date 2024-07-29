const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied' });
  }
  const secretkey = "pavankumar123";
  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, secretkey);
    req.user = verified;
    console.log(req.user)
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
