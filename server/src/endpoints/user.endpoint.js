import userCtrl from "../controllers/user.controllers"
import Safe from "../utils/Safe"

export default class UserEndpoints {
    async get(httpReq) {
        return {
            status: 200,
            data: await userCtrl.list()
        }
    }

    async post(httpReq) {
        // Create user
        let user = await userCtrl.create({
            email: httpReq.body.email,
            name: httpReq.body.name,
            password: httpReq.body.password
        })

        // Create cookie for session
        const {token, expiration} = Safe.generate_token({_id: user._id}, 600)
        return {
            status: 200,
            cookie: {name: 't', payload: token, options: {expires: expiration}},
            data: {user, token}
        }
    }

    User = {
        get: async (httpReq) => {
            return {
                status: 200,
                data: await userCtrl.read(httpReq.params.userId),

            }
        },

        put: async (httpReq) => {
            return {
                status: 200,
                data: {
                    user: await userCtrl.update(httpReq.auth, httpReq.body),
                    message: "User has been updated"
                }
            }
        }
    }
}