const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const sequence = [4, 1, 6, 1, 4];
const flag = "CTF{You got your fortune}";

app.post('/checkStep', (req, res) => {
  const { currentStep, currentValue } = req.body;

  if (currentStep === 0 && currentValue === "tenet") {
    return res.json({ nextStep: 1, clue: "Look for something sweet" });
  }

  if (sequence[currentStep - 1] === parseInt(currentValue, 10)) {
    if (currentStep < sequence.length) {
      return res.json({ nextStep: currentStep + 1, clue: `This is just ${currentStep + 1} of 5 steps.` });
    } else {
      // Sequence complete
      return res.json({ flag });
    }
  } else {
    return res.status(400).json({ error: 'Incorrect value. Please try again.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
