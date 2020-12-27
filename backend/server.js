const app = require('express')();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const postRoute = require('./routers/posts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todoapp", { useNewUrlParser: "true" });
mongoose.connection.on("error", (err) => { console.log("err", err) });
mongoose.connection.on("connected", (err, res) => { console.log("mongoose is connected!") });

app.use(cors());

app.use('/topshiriqlar', postRoute);

app.listen(8080, () => {
    console.log('Loyihamiz 8080 portda ishga tushdi!');
})