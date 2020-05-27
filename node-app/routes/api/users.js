// @login & register
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

/**
 * @route GET api/users/test
 * @description 返回请求的json数据
 * @access public
 */
router.get("/test", (req, res) => {
    res.json({
        msg: 'login works'
    })
});

/**
 * @route GET api/users/register
 * @description 用户注册
 * @access public
 */
router.post("/register", ((req, res) => {
    console.log(req.body);

    // 查询数据库中是否拥有邮箱
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user) {
                return res.status(400).json({msg: "邮箱已被注册"})
            } else {
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    // todo:: 可以写一个方法遍历赋值
                    name: req.body.name,
                    email: req.body.email,
                    cellPhone: req.body.cellPhone,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }
        })


}));

/**
 * @route GET api/users/login
 * @description 返回token jwt passport
 * @access public
 */
router.post("/login", ((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(404).json({msg: "用户不存在"})
            }
            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // 规则,加密名字,过期时间秒,箭头函数
                        const rule = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            cellPhone: user.cellPhone,
                            avatar: user.avatar,
                            identity: user.identity
                        };
                        jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        });
                    } else {
                        return res.status(400).json({msg: "密码错误"})
                    }
                })
        })
}));

router.get("/current", passport.authenticate('jwt', {session: false}), (req, res) => {

    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        cellPhone: req.user.cellPhone,
        identity: req.user.identity
    });
});


module.exports = router;




























