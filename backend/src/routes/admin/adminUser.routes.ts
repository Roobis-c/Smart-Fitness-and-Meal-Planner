import e, { Router } from 'express';
import { db } from '../../config/db';
import bcrypt from 'bcryptjs';

const router = Router();


router.post('/users', async (req, res) => {
  if (!req.session || !(req.session as any).admin) {
    return res.status(401).json({ message: 'Unauthorized admin' });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const [existing]: any = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    if (existing.length > 0) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result]: any = await db.query(
      `INSERT INTO users (name, email, password, goal, user_role)
       VALUES (?, ?, ?, 'weight_loss', 'user')`,
      [name, email, hashedPassword]
    );

    res.status(201).json({ userId: result.insertId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

export default router;
