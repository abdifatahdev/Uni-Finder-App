const express = require('express');
const app = express();
const PORT = 7777;
app.use(express.json());

app.post('/user-details', (req, res) => {
    const data = req.body;
    console.log(data);
    res.status(200).end();
});

// app.get('/user-details', (req, res) => {
//     const name = "Abdifatah"
//     res.send(`Hello ${name}`);
// });

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});