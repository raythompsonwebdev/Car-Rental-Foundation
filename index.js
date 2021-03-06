import express from "express";
import routes from "./src/routes/cr.Routes";
import bodyParser from "body-paerser";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRdb", {
    useMongoClent: true,
});

//body parser set up
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

//serving static files
app.use(express.static("public/images"));

app.get("/", (req, res) => {
    res.send(`Node is running express server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`your server is running on port ${PORT}`);
});
