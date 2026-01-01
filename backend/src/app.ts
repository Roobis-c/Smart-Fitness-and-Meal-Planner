import express from 'express';
import cors from 'cors';
import session from 'express-session';
import authRoutes from './routes/auth.routes';
import workoutRoutes from './routes/workout.routes';
import mealRoutes from './routes/meals.routes';
import trackerRoutes from './routes/progress.routes';
import adminRoutes from './routes/admin.routes';
import aiRoutes from './routes/ai.routes';




const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());

app.use(
  session({
    secret: 'smartfitness_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60
    }
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/tracker', trackerRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);


export default app;
