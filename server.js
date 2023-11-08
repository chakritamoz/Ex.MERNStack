const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { readdirSync } = require('fs');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Route 1
// app.get('/product', (req, res) => {
//   res.send(`Product Endpoint`);
// });

// Route 2
// const productRouter = require('./routes/product');
// const employeeRouter = require('./routes/employee');
// app.use('/api', productRouter);
// app.use('/api', employeeRouter);

// Route 3
readdirSync('./routes').map((file) => {
  app.use(require(`./routes/${file}`));
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server start at port ${port}`);
});