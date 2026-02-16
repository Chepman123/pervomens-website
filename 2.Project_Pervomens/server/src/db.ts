import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, "../src/.env") });

export default new MongoClient(process.env.URL!).connect();
