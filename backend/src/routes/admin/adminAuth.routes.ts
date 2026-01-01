import { Router } from 'express';
import { db } from '../../config/db';

const router = Router();
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [rows]: any = await db.query(
    'SELECT id, password, user_role FROM users WHERE email=?',
    [email]
  );
  if (!rows.length) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const admin = rows[0];
  if (admin.user_role !== 'admin') {
    return res.status(403).json({ message: 'Not an admin' });
  }

  if (password !== admin.password) {
    return res.status(401).json({ message: 'Wrong password' });
  }
  (req.session as any).admin = true;
  (req.session as any).adminId  = admin.id;
  res.json({ message: 'Admin login success' });
});
export default router;
