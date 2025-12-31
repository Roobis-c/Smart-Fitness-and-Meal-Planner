  import { Router } from 'express';
  import { db } from '../config/db';

  const router = Router();
  const safeParse = (data: any) => {
    if (!data) return null;
    if (typeof data === 'object') return data;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  };
  router.get('/', async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const [rows]: any = await db.query(
      `SELECT day, meals, target_calories, meal_completed
      FROM workout_meal_plans
      WHERE user_id=?`,
      [userId]
    );
    const result = rows.map((row: any) => ({
      day: row.day,
      meals: safeParse(row.meals),
      target_calories: row.target_calories,
      meal_completed: row.meal_completed
    }));

    res.json(result);
  });

  router.put('/meal', async (req, res) => {
    const userId = (req.session as any).userId;
    const { day, type, completed } = req.body;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const [[row]]: any = await db.query(
      `SELECT meals FROM workout_meal_plans
      WHERE user_id=? AND day=?`,
      [userId, day]
    );

    const meals = safeParse(row.meals);

    meals.meals = meals.meals.map((m: any) =>
      m.type === type ? { ...m, completed } : m
    );

    const completedCalories = meals.meals
      .filter((m: any) => m.completed)
      .reduce((sum: number, m: any) => sum + m.calories, 0);

    await db.query(
      `UPDATE workout_meal_plans
      SET meals=?, meal_completed=?
      WHERE user_id=? AND day=?`,
      [
        JSON.stringify(meals),
        completedCalories,
        userId,
        day
      ]
    );

    res.json({ meal_completed: completedCalories });
  });
  router.put('/reset-week', async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const [rows]: any = await db.query(
      `SELECT day, meals
      FROM workout_meal_plans
      WHERE user_id=?`,
      [userId]
    );

    for (const row of rows) {
      const meals =
        typeof row.meals === 'string'
          ? JSON.parse(row.meals)
          : row.meals;

      meals.meals.forEach((m: any) => (m.completed = false));

      await db.query(
        `UPDATE workout_meal_plans
        SET meals=?, meal_completed=0
        WHERE user_id=? AND day=?`,
        [JSON.stringify(meals), userId, row.day]
      );
    }

    res.json({ message: 'Meal week reset successfully' });
  });
  


  export default router;
