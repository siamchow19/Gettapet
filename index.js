const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const CategoryRoutes = require("./routes/category");
const PetRoutes = require("./routes/pet");
const AdoptionRoutes = require("./routes/adoption")

const app = express();

app.use(cors());

app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/category', CategoryRoutes);
app.use('/api/pet', PetRoutes);
app.use('/api/adoption', AdoptionRoutes);




const mongoUri = 'mongodb://0.0.0.0:27017/WoofDatabase';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
    console.log("Connected to mongodb1...");
})

mongoose.connection.on('error', (err) => {
    console.log("Error connecting to mongo", err);
})

app.listen(4000, () => {
    console.log('App is running on port 4000')
})