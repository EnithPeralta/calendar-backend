import express from "express"
import { config } from "dotenv";
const app = express();
const port = process.env.PORT || 8000;
import { dbConnection } from "./db/config.js";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/events.route.js";
import cors from "cors"
import path from "path";

app.use(cors())

config();

app.use(express.json())

app.use(express.static('public'))

app.use('/api/auth', authRoutes)
app.use('/api/event', eventRoutes)

app.use('*', (res, req) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => console.log('server listening on port', port));
dbConnection()