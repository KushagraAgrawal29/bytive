const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
// const Tech = require("../models/tech");

exports.createUser = async(req,res) => {
    // console.log("Ye rha mein");
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            gravatar,
            fieldOfInterest,
            seeking,
            bio,
            techStack,
            githubUrl,
            twitterUrl,
            websiteUrl,
            linkedInUrl
        } = req.body;

        if(!firstName || !lastName || !email || !gravatar || !fieldOfInterest || !seeking || !bio || !techStack || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are mandatory"
            })
        };

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        };

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gravatar,
            fieldOfInterest,
            seeking,
            bio,
            techStack,
            githubUrl,
            twitterUrl,
            websiteUrl,
            linkedInUrl
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error creating user",
        })
    };
};

exports.getAllUsers = async(req,res) => {
    try{
        const allUsers = await User.find(
            {},
            {
                firstName: true,
                lastName: true,
                gravatar:true,
                email:true,
                fieldOfInterest: true,
                seeking: true,
                bio:true,
                techStack: true,
                websiteUrl: true,
                twitterUrl: true,
                linkedInUrl: true,
                githubUrl: true,
            } 
        )

        return res.status(200).json({
            success: true,
            message: "All Users fetched Successfully",
            data: allUsers,
        })
    }   
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Error fetching all user details"
        })
    };
};

exports.searchProfiles = async(req,res) => {
    try{
        const { name,techStack,bio } = req.body;

        const query = {};

        if(name){
            query.name = new RegExp(name,"i");
        }
        if(techStack){
            query.techStack = new RegExp(techStack,"i");
        }
        if(bio){
            query.bio = new RegExp(bio,"i");
        }

        const profiles = await User.find(query);

        return res.status(200).json({
            success: true,
            message:"Search Results",
            profiles,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Error searching user profile"
        })
    }
};

exports.editUser = async (req,res) => {
    try{
        const { _id } = req.user;

        const updateProfile = await User.findByIdAndUpdate(_id,
            {
                $set: req.body
            },
            {
                new: true,
            },
            {
                runValidators: true
            }); //return

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            updateProfile
        });
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success: false,
            message:"Error updating user",
        })
    }
};

exports.login = async (req,res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and a password'
            });
        };

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not registered,please sign-up",
            });
        };

        if (await bcrypt.compare(password,user.password)) {
            const payload = {
                email: user.email,
                userId: user._id,
            };
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: "2h",
            });

            user.token  = token;
            user.password = password;

            //create cookie and send response

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token",token,options).status(200).json({
                success: true,
                message: "Login successfull",
                token,
                user
            });
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            });
        };
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Error logging in user",
        })
    }
};

//stretch goals

exports.editUserProfile = async(req,res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            gravatar,
            fieldOfInterest,
            seeking,
            bio,
            techStack,
            githubUrl,
            twitterUrl,
            websiteUrl,
            linkedInUrl
        } = req.body;

        if (req.user._id.toString() !== req.params.userId){
            return res.status(401).json({
                success: false,
                message: "You are not authorised, Please login in",
            })
        };

        const updateProfile = await User.findByIdAndUpdate(req.params.userId,{
            firstName,
            lastName,
            email,
            gravatar,
            fieldOfInterest,
            seeking,
            bio,
            techStack,
            githubUrl,
            twitterUrl,
            websiteUrl,
            linkedInUrl
        });

        console.log(updateProfile);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error updating user profile"
        })
    }
};

exports.deleteUser = async(req,res) => {
    try{
        if(req.user._id.toString() !== req.params.userId){
            return res.status(401).json({
                success: false,
                message: "You are not authenticated, Please log in"
            })
        };

        const deletedUser = await User.findByIdAndDelete(req.params.userId);

        console.log(deletedUser);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting user",
        })
    }
};

exports.UserAccount = async(req,res)=>{
    try{
        const { userId } = req.params;

        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            })
        };

        const user = await User.find({ _id: userId });

        if(!user){
            return res.status(404).json({
                success: false,
                message:"User not found",
            })
        };

        return res.status(200).json({
            success: true,
            message: "User fetched",
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user",
        })
    }
};
