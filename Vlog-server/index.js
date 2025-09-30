const express = require("express");
const fs = require("fs");
const cors = require("cors")
const mongoose = require("mongoose");
const { type } = require("os");
const dotenv = require('dotenv')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();


app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect mongodb
dotenv.config()
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connect mongodb"))
.catch(err => console.log("error is",err))


const secretKey = process.env.JWT_SECRET;
// create schema
const VlogSchema = new mongoose.Schema({
    tittle : {
        type : String,
        required : true,
    },
    vlog : {
        type : String,
        required : true,
    },
    // means kis user ne vlog create kya uska id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps: true})

// create model
const Vlogs = mongoose.model("vlog", VlogSchema);

// create favrate schema 
const FavoriteVlogsSchema = new mongoose.Schema({
    tittle : {
        type : String,
        required : true,
    },
    vlog : {
        type : String,
        required : true,
    }
}, {timestamps : true});

// create favorite model
const FavoriteVlogs = mongoose.model("favorite", FavoriteVlogsSchema);

// user schema

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})
const User = mongoose.model('user', UserSchema)

app.post('/api/signup', async(req, res) => {
    const {name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    return res.json({message : "created seccessfully"});
})

app.post('/api/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password, user.password)))
    {
        return res.status(401).json({message: "invailid email and password"})
    }
    const token = jwt.sign({userId : user._id}, secretKey);
    res.json(token)
})

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Always lowercase in Node
  const token = authHeader && authHeader.split(' ')[1]; // Handle "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


app.get('/api/users', async(req, res) => {
    const AllVlogs = await Vlogs.find({})
    return res.json(AllVlogs);
})

app.post('/api/createVlogs', verifyToken, async (req, res) => {
    const newVlogs = req.body;
    await Vlogs.create({
        tittle : newVlogs.title,
        vlog : newVlogs.vlog,
        user : req.userId,
    })
    return res.status(201).json({message : 'create seccessfully'})
       
    })

app.get('/api/myVlogs', verifyToken, async (req, res) => {
    const vlogs = await Vlogs.find({ user: req.userId });
    res.json(vlogs);
});

app.get('/api/me', verifyToken, async (req, res) => {
    const user = await User.findById(req.userId).select("name email");
    res.json(user);
});



app.post('/api/FavoriteVlogs', async (req, res) => {
    const favVlogs = req.body;
    const AllFavVlogs = await FavoriteVlogs.find({});
    const alreadyExist =   AllFavVlogs.find((item) => {
        return item.tittle === favVlogs.tittle;
    })

    if(!alreadyExist) {
      const result =   await FavoriteVlogs.create({
            tittle : favVlogs.tittle,
            vlog : favVlogs.vlog,
        })
    }

})

app.get('/api/FavoriteVlogs', async (req, res) => {
       const AllFav = await FavoriteVlogs.find({})
       return res.json(AllFav)
})

app.delete('/api/deleteVlog/:id', async (req, res) => {
    const vlodId = req.params.id;
    await FavoriteVlogs.findByIdAndDelete(vlodId);
})

app.get('/api/search/:tittle', async (req, res) => {
    const vlogTitle = req.params.tittle;
    const searchVlogs = await Vlogs.find({tittle : vlogTitle})
    res.json(searchVlogs)

})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server Started PORT ${PORT}`);
})