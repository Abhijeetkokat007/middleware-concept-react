import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if (conn) {
        console.log('monogDB is connect successfull')
    }
    else{
        console.log('monogDB is Not connect ')
    }
}

//-----------Middleware------------
const checkAPi = (req, res, next) => {
    const { apiKey } = req.query;

    if (apiKey === 'student') {
        next();
    } else {
        return res.status(401).json({
            success: false,
            message: 'API key is invalid'
        })
    }
}

const validateParams = (req, res, next) => {
    const { name, rollno, branch, year } = req.body;

    if (!name) {
        return res.json({
            success: true,
            message: 'Name is required'
        })
    }
    if (!rollno) {
        return res.json({
            success: true,
            message: 'Name is required'
        })
    }
    if (!branch) {
        return res.json({
            success: true,
            message: 'Name is required'
        })
    }
    if (!year) {
        return res.json({
            success: true,
            message: 'Year is required'
        })
    }
    next();
}
let count = 0;
const countApicalls = async (req, res, next) => {
    count++;
    console.log(`API calls ${count}`);
    next();
}

app.get('/api/students', checkAPi, countApicalls, async (req, res) => {
    res.json({
        success: true,
        data: ["count:", count],
        message: 'Successfully Fetch All Atudent'
    })
})

app.post('/api/student', checkAPi, validateParams, async (req, res) => {
    res.json({
        success: true,
        data: {},
        message: "Student save Successfull"
    })
})
//----------end Middleware------------


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` server is running  ${PORT}`)
    connectDB()
})