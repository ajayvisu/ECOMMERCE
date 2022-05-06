const router        = require("express").Router();
const bcrypt        = require("bcrypt");
const userSchema    = require("../models/user");

//REGISTER
router.post("/register", async (req, res)=>{
    try{
        const userName = req.body.userName;
        const eMail = req.body.eMail;
        const mobileNo = req.body.mobileNo;
        const passWord = req.body.passWord;

        if(userName && eMail && mobileNo && passWord){
            let userNameCheck = await userSchema.findOne({'userName': userName}).exec()
            let eMailcheck = await userSchema.findOne({'eMail': eMail}).exec()
            let mobileNoNew = await userSchema.findOne({'mobileNo': mobileNo}).exec()

            const userDetails = await (req, res)
            if(userNameCheck){
                return res.json({status: "failure", message: 'userName already exist'})
            }else
                if(eMailcheck){
                    return res.json({status: "failure", message: 'eMail already exist'})
                }else
                    if(mobileNoNew){
                        return res.json({status: "failure", message: 'mobileNo already exist'})
                    }else{}

            let newUser = new userSchema (req.body);
            let salt = await bcrypt.genSalt(10);
            newUser.passWord = bcrypt.hashSync(passWord, salt);
            console.log(newUser.passWord);
            let regUserDetails = await newUser.save();

        return res.status(200).json({status: "success", message: "user details registed successfully", data: regUserDetails})
        }
    }catch(err){
        console.log(err.message);
        return res.status(500).json({status: "failure", message: err.message})
    }
});

//LOGIN
router.post("/login", async (req, res)=>{
    try{
        const userName=req.body.userName;
        const passWord = req.body.passWord;

        let userDetails;
        let details = await userSchema.findOne({'userName': userName}).select('-userName -_id ').exec()

        if(userName){
            userDetails = await userSchema.findOne({'userName': userName}).exec()
            if(!userName){
                return res.status(400).json({status: "failure", message: "user not found"});
            }else
                if(userDetails){
                    let match = await bcrypt.compare(passWord, userDetails.passWord);
                    console.log("passWord match found")
                    return res.status(200).json({status: "success", message: "Login successfull", data: details})
                }else{}
        }else{}
    }catch(err){
        console.log(err.message);
        return res.status(500).json({status: "failure", message: err.message})
    }
})

module.exports = router;