import { Router } from 'express';
import { db } from '../../config/db';

const router = Router();
router.get('/users/:id', async (req, res) => {
  if (!req.session || !(req.session as any).admin) {
    return res.status(401).json({ message: 'Unauthorized admin' });
  }
  const { id } = req.params;
  const [[user]]: any = await db.query(
    'SELECT id, name, email, age, gender, height, weight, goal FROM users WHERE id=?',
    [id]
  );
  const [plans]: any = await db.query(
    'SELECT * FROM workout_meal_plans WHERE user_id=?',
    [id]
  );

  res.json({ user, plans });
});
router.put('/users/profile', async (req, res) => {
  if (!req.session || !(req.session as any).admin) {
    return res.status(401).json({ message: 'Unauthorized admin' });
  }
  const { userId, age, gender, height, weight, goal } = req.body;
  await db.query(
    `UPDATE users
     SET age=?, gender=?, height=?, weight=?, goal=?
     WHERE id=?`,
    [age, gender, height, weight, goal, userId]
  );
  res.json({ message: 'User profile updated successfully' });
});
router.put('/users/:id/plan', async (req, res) => {

  if (!req.session || !(req.session as any).admin) {
    return res.status(401).json({ message: 'Unauthorized admin' });
  }
  const { id } = req.params;
  const plan = req.body;
  await db.query(
    `UPDATE workout_meal_plans
     SET exercises=?, meals=?, target_calories=?
     WHERE user_id=? AND day=?`,
    [
      JSON.stringify(plan.exercises),
      JSON.stringify(plan.meals),
      plan.target_calories,
      id,
      plan.day
    ]
  );

  res.json({ message: 'Plan updated by admin' });
});

export default router;
