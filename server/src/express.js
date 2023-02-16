import express from "express"
import userRoutes from "./routes/user.route"
import path from "path"
import config from "./config"

const app = express()

const root_dir = path.join(process.cwd(), '../')
if (config.env === 'development') { // Handle React routing, return all requests to React app

    app.get('*', function(req, res) {
        res.sendFile(path.join(root_dir, 'client/build', 'index.html'))
    })
} else {    // Serve any static files
    app.use(express.static(path.join(root_dir, 'client/build')))
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(userRoutes)


export default app