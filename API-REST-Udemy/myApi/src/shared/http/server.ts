import 'dotenv/config'
import express from 'express';
import { routes } from './routes';
import 'express-async-errors';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(routes)
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}/`);
});
