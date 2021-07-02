const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRoute = require("./routes/api/user");
const authRoute = require("./routes/api/auth");
const postRoute = require("./routes/api/post");
const voteRoute = require("./routes/api/vote");

dotenv.config();
const app = express();
const db = require("./models");

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/votes", voteRoute);

app.use((req, res) => {
  res.status(404).send("404: page not found");
});

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
