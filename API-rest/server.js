import app from "./app.js";

const port = 3002;

app.listen(port, () => {
  console.log();
  console.log(`Porta aberta ${port}`);
  console.log(`CRTL + Clique em http://localhost:${port}`);
});
