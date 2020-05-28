const express = require("express");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入users.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");



// DB Config
const db = require("./config/keys").mongoURI;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // 干啥用的?


mongoose.connect(db, {
    user: "kevin",
    pass: '123456',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => console.log(`MongoDB connected`))
    .catch(err => console.log(`MongoDB connected Failed: ${err}`));

// passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);


app.get("/", (req, res) => {
    res.send("Hello world");
});




// 使用routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`)
});
