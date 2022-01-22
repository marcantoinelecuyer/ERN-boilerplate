import express from "express"
import config from "./config"
import userRoutes from "./routes/user.route"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(userRoutes)

app.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`)
})
