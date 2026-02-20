import User from "./DB/models/user.model.js";
import Post from "./DB/models/post.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const bootstrap = (app, express) => {

    app.use(express.json());
// middleware Authentication
    const authorization = async (req, res, next) => {
        //check the Token 
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json(
                {
                    message: "Token is required"
                }
            )
        }
        // Check The payload "Id"
        const decode = jwt.verify(authorization, "My secret key")
        if (!decode.id) {
            return res.status(401).json(
                {
                    message: "invalid token payload"
                }
            )
        }
        //Find The user 
        const user = await User.findById(decode.id)
        req.user = user
        return next()
    }

//Register API
    app.post('/register', async (req, res) => {
        const { username, email, password } = req.body
        //Check if User is exists or not
        const exists = await User.findOne({ email })
        if (exists) {
            return res.status(409).json(
                {
                    message: "user is already exists!"
                }
            )
        }
        //Hash the Password with Bcrypt package
        const hashpass = bcrypt.hashSync(password, 10)
        //Create a new User
        const newuser = await User.create({
            username,
            email,
            password: hashpass
        })
        return res.status(201).json(
            {
                message: "user is registered!",
                newuser: {
                    username,
                    email
                }
            }
        )
    })

//Login API
    app.post('/login', async (req, res) => {
        const { email, password } = req.body
        //check if the user is exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "invalid username or passwoed !"
            })
        }
        //check if the password is correct 
        const comparepass = bcrypt.compareSync(password, user.password)
        if (!comparepass) {
            return res.status(404).json(
                {
                    message: "invalid username or password"
                }
            )
        }
        //create the Token 
        const token = jwt.sign({ id: user._id, islogged: true }, "My secret key")
        return res.status(200).json(
            {
                message: "loggin successful",
                Token: token
            }
        )
    })
//Create Posts API
    app.post('/createpost', authorization, async (req, res) => {
        const { id, title, content } = req.body
        //check if all fields are assigned 
        if (!id || !title || !content) {
            return res.status(400).json(
                {
                    message: "all fields are required"
                }
            )
        }
        //check if the user is exists 
        const exists = await User.findById( id )
        if (!exists) {
            return res.status(404).json(
                {
                    message: "user doesn't exists"
                }
            )
        }
        //create the post 
        const newpost = await Post.create({
            id,
            title,
            content
        })
        return res.status(201).json({
            message: "post is created!"
        })
    })
//Create the Viewposts API
    app.get('/api/posts', authorization, async (req,res)=>
    {
        //retrive posts from DataBase
        const posts = await Post.find({
            id : req.user._id 
        })
        return res.status(200).json(
            {
                message : "Done",
                posts
            }
        )
        
    })
//View Profile API
    app.get("/profile",authorization,(req,res)=>
    {
        //retrive the user data from req.user
        const {username,email}=req.user
        return res.status(200).json({
            message :
            {
                   username ,
                   email 
            }
        })
    })

}
export default bootstrap