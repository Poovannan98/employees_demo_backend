require('dotenv').config();
const express = require('express');
var cors = require('cors');
const db = require('./DB/connect');
const employeeRoutes = require('./Routes/employees.routes');

const app = express();

// connecting db
db();

app.get('/', (request , response) => {
    response.send('Wellcome to Employees APP!');
});

//adding middleware
app.use(express.json());

app.use('/api', employeeRoutes);

// using cors
app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});