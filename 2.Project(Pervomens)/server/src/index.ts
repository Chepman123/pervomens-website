import express from 'express';
import cors from 'cors';
import Routes from './Routes';
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(express.json({limit:'10mb'}));

const allowedOrigins = ['https://dantway.pl', 'http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','OPTIONS','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.options('*', cors());

app.use('/', Routes());

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
