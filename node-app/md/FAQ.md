## 如何连接 MongoDB 数据库
- 安装 mongoose 
```
yarn add mongoose
```
- 在server.js中连接MongoDB
```
mongoose.connect(MongoDBURI, {
    user: "",
    pass: ''
}).then(res => console.log(`MongoDB connected`))
  .catch(err => console.log(`MongoDB connected Failed: ${err}`))
```

## 使用 Express Route 创建接口地址
首先创建路由文件
```
const express = require("express");
const router = express.Router();

/**
 * @route GET api/users/test
 * @description 返回请求的json数据
 * @access public
 */
router.get("/test", (req, res)=>{
   res.json({
       msg: 'login works'
   })
});


module.exports = router;
``` 
然后在server.js中使用
```javascript
// 引入users.js
const users = require("./routes/api/users");

// 使用routes
app.use("/api/users", users);
```

## 使用 mongoose 创建模型

```
const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    cellPhone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
});
// users 表名
module.exports = User = mongoose.model("users", UserSchema);
```
## 加密 bcrypt

```javascript
   bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
```
密码匹配
```javascript
    bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json({token: "success"})
                    } else {
                        return res.status(400).json({password: "密码错误"})
                    }
                })
```

## jsonwebtoken  生成token



## passport passport-jwt









