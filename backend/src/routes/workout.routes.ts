import { Router } from 'express';
import { db } from '../config/db';

const router = Router();

const safeParse = (data: any) => {
  if (!data) return [];
  if (typeof data === 'object') return data;
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

router.get('/', async (req, res) => {
  const userId = (req.session as any).userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const [rows]: any = await db.query(
    `SELECT day, exercises, completed_status
     FROM workout_meal_plans
     WHERE user_id=?`,
    [userId]
  );

  const result = rows.map((row: any) => ({
    day: row.day,
    exercises: safeParse(row.exercises),
    completed_status: safeParse(row.completed_status) || { completed: false }
  }));

  res.json(result);
});

router.put('/exercise', async (req, res) => {
  const userId = (req.session as any).userId;
  const { day, name, completed } = req.body;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const [[row]]: any = await db.query(
    `SELECT exercises FROM workout_meal_plans
     WHERE user_id=? AND day=?`,
    [userId, day]
  );

  const exercises = safeParse(row.exercises);

  const updated = exercises.map((ex: any) =>
    ex.name === name ? { ...ex, completed } : ex
  );

  const dayCompleted =
    updated.length && updated.every((ex: any) => ex.completed);

  await db.query(
    `UPDATE workout_meal_plans
     SET exercises=?, completed_status=?
     WHERE user_id=? AND day=?`,
    [
      JSON.stringify(updated),
      JSON.stringify({ completed: dayCompleted }),
      userId,
      day
    ]
  );

  res.json({ completed: dayCompleted });
});
router.put('/reset-week', async (req, res) => {
  const userId = (req.session as any).userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const [rows]: any = await db.query(
    `SELECT day, exercises FROM workout_meal_plans WHERE user_id=?`,
    [userId]
  );

  for (const row of rows) {
    const exercises = safeParse(row.exercises).map((ex: any) => ({
      ...ex,
      completed: false
    }));

    await db.query(
      `UPDATE workout_meal_plans
       SET exercises=?, completed_status=?
       WHERE user_id=? AND day=?`,
      [
        JSON.stringify(exercises),
        JSON.stringify({ completed: false }),
        userId,
        row.day
      ]
    );
  }

  res.json({ message: 'Week reset successful' });
});

export default router;
