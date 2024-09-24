const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const correctSequence = ["4", "1", "6", "1", "4"];
const flag = "CTF{You_Found_ME}";

app.post('/getFlag', (req, res) => {
  const { sequenceComplete } = req.body;

  if (sequenceComplete) {
    res.json({ flag });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
