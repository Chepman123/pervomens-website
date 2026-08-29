import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import Reg from './Routes/RegLog';
import Main from './Routes/Main';
import User from './Routes/User';
import Admin from './Routes/Admin';
import News from './Routes/News';
const cookieParser = require('cookie-parser');
const app = express();
app.use(helmet());
app.use(express.json({limit:'10mb'}));
app.use(cookieParser());

const allowedOrigins = ['https://pervomens-website-ruddy.vercel.app','https://pervomens-website-ruddy.vercel.app/?_vercel_share=uyat8wNZIvXgaurg66yBDvrDSsxgGeTW', 'http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','OPTIONS','DELETE','PATCH','PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.options('*', cors());

app.use('/', Reg());
app.use('/', Main());
app.use('/profile/', User());
app.use('/AdminPanel', Admin());
app.use('/News',News());

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
