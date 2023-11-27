const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { readdirSync } = require('fs');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

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
  app.use('/api', require(`./routes/${file}`));
});


app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server start at port ${process.env.SERVER_PORT}`);
});