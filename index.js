require('dotenv').config();
const express = require('express');
const cors = require('cors');
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
// using cors
app.use(cors());

app.use('/api', employeeRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});
