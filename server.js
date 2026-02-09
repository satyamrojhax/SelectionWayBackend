const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/batches', require('./routes/batches'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/batches', require('./routes/batch'));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
