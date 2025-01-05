import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './api/users/index.js';
import movieRoutes from './api/movies/index.js';
import defaultErrHandler from './errHandler/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Movies API!');
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.use(defaultErrHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
