import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import familyMembersRoutes from "./routes/familyMemberRoutes.js"
import dashboardRoute from "./routes/dashboardRoute.js"
import assetsRoute from "./routes/assetsRoute.js"
import liabilityRoute from "./routes/liabilityRoute.js"
import familyTreeRoutes from "./routes/familyTreeRoutes.js"
import memberRoutes from "./routes/memberRoutes.js"
import cors from "cors"
dotenv.config();
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:2000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/", authRoutes)
app.use("/family-members", familyMembersRoutes)
app.use('/dashboard', dashboardRoute )
app.use("/assets", assetsRoute)
app.use("/liability", liabilityRoute)
app.use("/family",familyTreeRoutes)
app.use("/member", memberRoutes)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})


