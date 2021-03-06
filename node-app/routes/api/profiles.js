const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");

router.get("/test", (req, res) => {
    res.json({
        msg: 'login works'
    })
});

router.post("/add", passport.authenticate('jwt', {session: false}), (req, res) => {
    const profileFields = {};

    profileFields.type = req.body.type || null;
    profileFields.describe = req.body.describe || null;
    profileFields.income = req.body.income || null;
    profileFields.expand = req.body.expand || null;
    profileFields.cash = req.body.cash || null;
    profileFields.remark = req.body.remark || null;

    new Profile(profileFields).save().then(profile => {
        res.json(profile);
    })
});

router.get("/", passport.authenticate('jwt', {session: false}), ((req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json({msg: "没有任何内容"})
            }
            res.json(profile)
        })
        .catch(err => {
            res.status(404).json(err)
        })
}));

router.get("/:id", passport.authenticate('jwt', {session: false}), ((req, res) => {
    Profile.findOne({_id: req.params.id})
        .then(profile => {
            if (!profile) {
                return res.status(404).json({msg: "没有任何内容"})
            }
            res.json(profile)
        })
        .catch(err => {
            res.status(404).json(err)
        })
}));

router.post("/edit/:id", passport.authenticate('jwt', {session: false}), (req, res) => {

    const profileFields = {};
    profileFields.type = req.body.type || null;
    profileFields.describe = req.body.describe || null;
    profileFields.income = req.body.income || null;
    profileFields.expand = req.body.expand || null;
    profileFields.cash = req.body.cash || null;
    profileFields.remark = req.body.remark || null;

    Profile.findOneAndUpdate(
        {_id: req.params.id},
        {$set: profileFields},
        {new: true}
    ).then(profile => res.json(profile))
});


router.delete("/delete/:id", passport.authenticate('jwt', {session: false}), ((req, res) => {
    Profile.findOneAndRemove({_id: req.params.id})
        .then(profile => {
            console.log("删除成功");
            console.log(profile);
            res.json(profile)
        })
        .catch(err =>{
            console.log(err);
            res.status(404).json({msg: "删除失败"})
        })
}));


module.exports = router;