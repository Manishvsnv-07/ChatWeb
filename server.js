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
const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URL)

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: `${process.env.FRONTEND_URL}`,
        credentials: true
    }
})

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
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

io.on("connection", (socket) => {

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

        socket.to(data.roomId).emit("message-seen", {
            roomId: data.roomId,
            seenBy: data.currentUserId
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
        socket.join(typing.roomId)
        socket.to(typing.roomId).emit("Typing-receive", typing)
    })


    socket.on("disconnect", async () => {
        if (!socket.UserId) return

        const lastSeen = new Date()

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
    res.send(`
        <html>
            <body style="margin:0; background:#09090b; display:flex; justify-content:center; align-items:center; height:100vh;">
                <h1 style="color:#6ee7b7; font-size:24px; font-weight:600;">
                    Welcome To ChatWeb - Connect With People
                </h1>
            </body>
        </html>
    `)
})

app.post("/create/account", async (req, res) => {
    try {
        const { email, name, password, username, status, gender, country, countrycode } = req.body;

        let HashPassword = await bcrypt.hash(password, 10)

        const token = jwt.sign({ email }, process.env.MY_SECRET, {
            expiresIn: "30d"
        })

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

        await create.save()

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ success: true })

    } catch (error) {
        console.log('error occured : ', error);
        res.status(500).json({ success: false })
    }
})

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

        if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const FindUser = await user.findOne({ username });
        const isMatch = FindUser ? await bcrypt.compare(password, FindUser.password) : false;

        if (!FindUser || !isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: FindUser.email }, process.env.MY_SECRET, {
            expiresIn: "30d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ success: true });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
});

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
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit

    const AllUsers = await user.find()
        .skip(skip)
        .limit(limit)
        .select("-password")

    const total = await user.countDocuments()

    res.json({
        AllUsers,
        hasMore: page * limit < total
    })
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
        let findUser = await user.findOne({ email: req.datahere.email })

        await user.findByIdAndUpdate(findUser._id, {
            avatar: result.secure_url
        })
        res.status(200).json({ success: true })
    } catch (error) {
        console.log('Error : ', error.message);

        res.status(200).json({ success: true, error: error.message })
    }
})

app.get("/api/UnreadMsgData/:UserID", async (req, res) => {
    const { UserID } = req.params;
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

    res.status(200).json({ success: true, UnreadData: UnreadData })
})

app.post("/api/Addfriend", islogged, async (req, res) => {
    const { SelectedUser } = req.body;
    let FindMe = await user.findOne({ email: req.datahere.email })

    const AlreadyFriend = FindMe.Friends.some(
        (id) => id.toString() === SelectedUser._id.toString()
    )

    if (AlreadyFriend) {
        await user.updateOne(
            { _id: FindMe._id },
            { $pull: { Friends: SelectedUser._id } }
        )
        res.json({ Friend: false, friends: FindMe.Friends })
    }
    else {
        await user.updateOne(
            { _id: FindMe._id },
            { $push: { Friends: SelectedUser._id } }
        )
    }
    res.json({ Friend: true, friends: FindMe.Friends })
})


app.get("/api/FriendsData", islogged, async (req, res) => {
    const FindMe = await user.findOne({ email: req.datahere.email })
    const FriendsData = await user.find({
        _id: { $in: FindMe.Friends }
    })
    res.status(200).json({ FriendsData: FriendsData, success: true })
})

app.get("/api/SearchedUser", islogged, async (req, res) => {
    const { query } = req.query;
    console.log(query);

    const findMe = await user.findOne({ email: req.datahere.email })
    if (!query || query.trim() === '') {
        return res.json({ users: [] });
    }
    try {

        const users = await user.find({
            username: { $regex: query, $options: "i" },
            _id: { $ne: findMe._id }
        })
            .select("username gender avatar countrycode")
            .limit(15)


        res.json({ users })
    } catch (error) {
        res.status(500).json({ message: 'Search failed' });
    }


})

app.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.json({ success: true })
})

server.listen(port, () => {
    console.log(`port listen at ${port}`);
})
