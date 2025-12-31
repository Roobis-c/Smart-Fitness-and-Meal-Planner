import { Router } from 'express';
import { db } from '../../config/db';

const router = Router();
router.get('/users', async (req, res) => {
  if (!req.session || !(req.session as any).admin) {
    return res.status(401).json({ message: 'Unauthorized admin' });
  }
  const [rows] = await db.query(
    `SELECT id, name, goal, height, weight, created_at
     FROM users
     WHERE user_role='user'`
  );
  res.json(rows);
});
router.delete('/users/:id', async (req, res) => {
  if (!req.session || !(req.session as any).admin) {
    return res.status(401).json({ message: 'Unauthorized admin' });
  }
  const { id } = req.params;
  await db.query('DELETE FROM workout_meal_plans WHERE user_id=?', [id]);
  await db.query('DELETE FROM users WHERE id=?', [id]);
  res.json({ message: 'User deleted successfully' });
});
export default router;
