import jwt from 'jsonwebtoken';

const SECRET_KEY = 'super_secret_jelszo';

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Hiányzó token' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Érvénytelen token' });

    req.user = user;
    next();
  });
}
