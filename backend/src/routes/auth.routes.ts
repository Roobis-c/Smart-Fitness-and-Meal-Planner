import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { db } from '../config/db';
import fs from 'fs';
import path from 'path';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', async (req, res) => {
  const userId = (req.session as any).userId;
  if (!userId) return res.status(401).json({ message: 'Not logged in' });

  const [rows]: any = await db.query(
    `SELECT name, age, gender, height, weight, goal
     FROM users WHERE id=?`,
    [userId]
  );
  

  res.json(rows[0]);
});

router.put('/profile', async (req, res) => {
  const userId = req.body.userId || (req.session as any).userId ;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const { name, age, gender, height, weight, goal } = req.body;
  const [[oldUser]]: any = await db.query(
    'SELECT goal FROM users WHERE id=?',
    [userId]
  );
  const oldGoal = oldUser.goal;

  await db.query(
    `UPDATE users
     SET name=?, age=?, gender=?, height=?, weight=?, goal=?
     WHERE id=?`,
    [name, age, gender, height, weight, goal, userId]
  );

  const [[mealRow]]: any = await db.query(
    'SELECT COUNT(*) as count FROM workout_meal_plans WHERE user_id=? AND meals IS NOT NULL',
    [userId]
  );

  const mealsMissing = mealRow.count === 0;

  if (oldGoal !== goal || mealsMissing) {
    await db.query(
      'DELETE FROM workout_meal_plans WHERE user_id=?',
      [userId]
    );

    const workoutPath = path.join(__dirname, `../template/workouts/${goal}.json`);
    const mealPath = path.join(__dirname, `../template/meals/${goal}.json`);

    const workoutData = JSON.parse(fs.readFileSync(workoutPath, 'utf-8'));
    const mealData = JSON.parse(fs.readFileSync(mealPath, 'utf-8'));

    for (const day of workoutData.workoutPlan) {

      const mealDay = mealData.mealPlan.find(
        (m: any) => m.day === day.day
      );

      const exercises = day.exercises.map((ex: any) => ({
        ...ex,
        completed: false
      }));

      const meals = {
        targetCalories: mealDay.targetCalories,
        meals: mealDay.meals.map((m: any) => ({
          ...m,
          completed: false
        }))
      };

      await db.query(
        `INSERT INTO workout_meal_plans
         (user_id, day, exercises, meals, target_calories, meal_completed, completed_status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          day.day,
          JSON.stringify(exercises),
          JSON.stringify(meals),
          mealDay.targetCalories,
          0,
          JSON.stringify({ completed: false })
        ]
      );
    }
  }

  res.json({});
});

export default router;