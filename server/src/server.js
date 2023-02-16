import config from "./config"
import app from "./express"


app.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`)
})
