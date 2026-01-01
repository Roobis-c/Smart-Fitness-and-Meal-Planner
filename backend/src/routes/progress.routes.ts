import { Router } from 'express';
import { db } from '../config/db';

const router = Router();

router.get('/', async (req, res) => {
  const userId = (req.session as any).userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const [[user]]: any = await db.query(
    `SELECT height, weight FROM users WHERE id = ?`,
    [userId]
  );

  let bmi = 0;
  let bmiStatus = '';

  if (user?.height && user?.weight) {
    const heightInMeters = user.height / 100;
    bmi = +(user.weight / (heightInMeters * heightInMeters)).toFixed(2);

    if (bmi < 18.5) bmiStatus = 'Low';
    else if (bmi < 25) bmiStatus = 'Normal';
    else bmiStatus = 'High';
  }

  const [workouts]: any = await db.query(
    `SELECT day, exercises FROM workout_meal_plans WHERE user_id = ?`,
    [userId]
  );

  const workoutData = workouts.map((row: any) => {
    const exercises = typeof row.exercises === 'string'
      ? JSON.parse(row.exercises)
      : row.exercises;

    const completedCount = exercises?.filter((e: any) => e.completed).length || 0;

    return {
      day: row.day,
      completed: completedCount
    };
  });

  const [meals]: any = await db.query(
    `SELECT day, target_calories, meal_completed 
     FROM workout_meal_plans 
     WHERE user_id = ?`,
    [userId]
  );

  const mealData = meals.map((m: any) => ({
    day: m.day,
    target: m.target_calories,
    consumed: m.meal_completed
  }));

  res.json({
    bmi,
    bmiStatus,
    workouts: workoutData,
    meals: mealData
  });
});

export default router;
