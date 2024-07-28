import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createUser, signin } from './handlers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/user', createUser);
app.post('/signin', signin);

app.get('/', (_, res) => {
  res.status(200);
  res.json({ message: 'hello' });
});

export default app;

