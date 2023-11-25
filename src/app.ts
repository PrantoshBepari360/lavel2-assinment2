import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/user/user.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', StudentRoutes);

export default app;
