import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import taskRoutes from './routes/taskRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {

  res.send('Server is running');

});

// Task Routes
app.use('/api/tasks', taskRoutes);

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});