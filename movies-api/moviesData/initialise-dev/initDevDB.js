import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users.js';
import movies from './movies.js';
import User from '../../api/users/userModel.js';
import Movie from '../api/movies/movieModel.js';

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    try{
        await mongoose.connect(process.env.MONGO_DB);
    // Drop collections
        await User.collection.drop().catch(err => console.log('User collection not found'));
        await Movie.collection.drop().catch(err => console.log('Movie collection not found'));
        await User.create(users);
        await Movie.create(movies);
        console.log('Database initialised');
        console.log(`${users.length} users loaded`);
        console.log(`${movies.length} movies loaded`);
    } catch (err) {
        console.error('Error initializing the database:', err);
    } finally {
        await mongoose.disconnect();
    }
}

main();
