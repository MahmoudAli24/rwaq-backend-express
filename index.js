require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const port = process.env.PORT

const app = express();

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => console.log("Connected to MongoDB..."));

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/teachers', teacherRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
 res.send('Hello World!')
})

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})