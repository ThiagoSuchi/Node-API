import express from 'express';
import 'express-async-errors';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}/`);
});
