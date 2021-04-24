const express = require("express");
const path = require("path");
const helmet = require("helmet");
const userRoute = require("./routes/api/user");

const app = express();
const db = require("./models");

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoute);

app.use((req, res) => {
  res.status(404).send("404: page not found");
});

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
