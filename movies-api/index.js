import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users/index.js';
import moviesRouter from './api/movies/index.js';
import authenticate from './authenticate/index.js';
import './db/index.js';
import defaultErrHandler from './errHandler/index.js';
import watchlistRouter from './api/watchlist/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; // Default to port 8080

 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Movies API!');
});

app.use('/api/users', usersRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use("/api/watchlist", watchlistRouter);


app.use(defaultErrHandler);

app.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`);
});
