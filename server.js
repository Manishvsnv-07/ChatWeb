import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { user } from "./models/user.js"
import jwt from "jsonwebtoken"
import bcrypt, { compare } from "bcrypt"
import islogged from "./middlewares/islogged.js"
import cookieParser from "cookie-parser";
import { Server } from "socket.io"
import { createServer } from "node:http"
import { chat } from "./models/Chat.js"
import multer from "multer"
import { v2 as cloudinary } from 'cloudinary'

const app = express()
const port = process.env.PORT || 8080
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser());

const storage = multer.memoryStorage()
const upload = multer({ storage })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
})
console.log("CONFIG:", cloudinary.config())
console.log(process.env.CLOUDINARY_APIKEY);
console.log(process.env.CLOUDINARY_APISECRET);

io.on("connection", (socket) => {
    console.log('User Connected : ', socket.id);

    socket.on("user-active", async (UserId) => {
        socket.UserId = UserId

        await user.findByIdAndUpdate(UserId, {
            isOnline: true,
        })

        io.emit("presence-update", {
            UserId,
            isOnline: true
        })
    })

    socket.on("join-room", async (data) => {
        socket.join(data.roomId)
        socket.UserId = data.currentUserId

        await chat.updateMany(
            { roomId: data.roomId, receiverId: data.currentUserId, read: false },
            { $set: { read: true } }
        )

        socket.to(data.roomId).emit("message-seen",{
            roomId:data.roomId,
            seenBy:data.currentUserId
        })
    })

    socket.on("send-message", async (data, callback) => {

        const roomSockets = await io.in(data.roomId).fetchSockets()
        const receiverOnline = roomSockets.some(
            (s) => String(s.UserId) === String(data.receiverId)
        )

        const savedMessage = await chat.create({
            roomId: data.roomId,
            senderId: data.senderId,
            receiverId: data.receiverId,
            text: data.text,
            read: receiverOnline ? true : false
        })
        socket.to(data.roomId).emit("receive-message", data)

        callback(savedMessage)
    })

    socket.on("typing-message", (typing) => {
        console.log(typing);

        socket.join(typing.roomId)
        socket.to(typing.roomId).emit("Typing-receive", typing)
    })


    socket.on("disconnect", async () => {
        if (!socket.UserId) return

        const lastSeen = new Date()
        console.log(lastSeen);

        await user.findByIdAndUpdate(socket.UserId, {
            isOnline: false,
            lastSeen,
        })

        io.emit("presence-update", {
            UserId: socket.UserId,
            isOnline: false,
            lastSeen
        })
    })
})

app.get("/messages/:roomId", async (req, res) => {
    let findchat = await chat.find({ roomId: req.params.roomId })
    res.status(200).json({ success: true, message: findchat })

})


app.get("/", (req, res) => {
    res.send("hello backend")
})

app.post("/create/account", async (req, res) => {
    try {
        const { email, name, password, username, status, gender, country, countrycode } = req.body;
        let HashPassword = await bcrypt.hash(password, 10)
        const token = jwt.sign({ email }, "My_Secret")
        const create = new user({
            email: email,
            name: name,
            username: username,
            gender: gender,
            status: status,
            country: country,
            countrycode: countrycode,
            password: HashPassword
        })
        create.save()
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ success: true })

    } catch (error) {
        res.status(200).json({ success: false })
        console.log('error occured : ', error);
    }
})
app.use((req, res, next) => {
    console.log("Request aaya:", req.method, req.path);
    next();
});
app.get("/profile/data", islogged, async (req, res) => {
    try {
        const userdata = await user.findOne({
            email: req.datahere.email
        });
        res.status(200).json({
            success: true,
            userdata
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        let FindUser = await user.findOne({ username: username })
        if (FindUser) {
            let CheckPassword = await bcrypt.compare(password, FindUser.password)
            if (CheckPassword) {
                let token = jwt.sign({ email: FindUser.email }, "My_Secret", {
                    expiresIn: "10 years"
                })

                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "lax",
                    maxAge: 10 * 365 * 24 * 60 * 60 * 1000
                })
                res.status(200).json({ success: true })
            }
        }

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
})

app.post("/update/data", islogged, async (req, res) => {
    try {
        const { Uusername, Uname, Ugender, Ustatus } = req.body;
        let FindUser = await user.findOneAndUpdate({ email: req.datahere.email },
            { $set: { username: Uusername, name: Uname, gender: Ugender, status: Ustatus } },
            { returnDocument: 'after' }
        )
        await FindUser.save()
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

})

app.get("/getUsers", async (req, res) => {
    const getusers = await user.find()
    res.status(200).json({ AllUsers: getusers })
})


app.get("/ClickedUserData/:username", async (req, res) => {
    const { username } = req.params;
    const FindClickedUser = await user.findOne({ username: username })
    if (!FindClickedUser) {
        return res.status(400).json({ message: "Not Found", success: false })
    }

    res.status(200).json({ success: true, FindClickedUser })
})

const uploaddpToCloudinary = (buffer, mimetype) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: "image", folder: "postnow" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        }
        );
        stream.end(buffer);
    });
};



app.post("/api/avatar", upload.single('media'), islogged, async (req, res) => {
    try {
        const result = await uploaddpToCloudinary(req.file.buffer, "image");
        console.log(result.secure_url);
        let findUser = await user.findOne({ email: req.datahere.email })

        await user.findByIdAndUpdate(findUser._id, {
            avatar: result.secure_url
        })
        console.log(findUser);
        res.status(200).json({ success: true })
    } catch (error) {
        console.log('Error : ', error.message);

        res.status(200).json({ success: true, error: error.message })
    }
})

app.get("/api/UnreadMsgData/:UserID", async (req, res) => {
    const { UserID } = req.params;
    console.log(UserID);

    const UnreadData = await chat.aggregate([
        {
            $match: {
                receiverId: new mongoose.Types.ObjectId(UserID),
                read: false
            }
        },
        {
            $group: {
                _id: "$senderId",
                unreadCount: { $sum: 1 }
            }
        }
    ])
    console.log("Unread : ", UnreadData);

    res.status(200).json({ success: true, UnreadData: UnreadData })
})

server.listen(port, () => {
    console.log(`port listen at ${port}`);
})

