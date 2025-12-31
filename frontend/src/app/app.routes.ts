import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WorkoutRoutineComponent } from './pages/workout-routine/workout-routine.component';
import { MealPlannerComponent } from './pages/meal-planner/meal-planner.component';
import { ProgressTrackerComponent } from './pages/progress-tracker/progress-tracker.component';
import { AiComponent } from './pages/ai-trainer/ai.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { LearnFitnessComponent } from './pages/learn-fit/learn-fit.component';
import { AdminAddUserComponent } from './admin/admin-add-user/admin-add-user.component';
export const routes: Routes = [

  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'workouts',
    component: WorkoutRoutineComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'meals',
    component: MealPlannerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'progress',
    component: ProgressTrackerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ai-trainer',
    component: AiComponent,
    canActivate: [AuthGuard]
  },
   {
    path: 'learn',
    component: LearnFitnessComponent,
    canActivate: [AuthGuard]
  },
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/user/:id',
    component: AdminUserComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/add-user',
    component:AdminAddUserComponent,
    canActivate: [AdminGuard]
  },
  { path: '**', redirectTo: '' }
];