import express from 'express'
import UserEndpoints from '../endpoints/user.endpoint'
import capture from "../helpers/capture"
import {authenticate, isAuthorized} from "../helpers/auth-helper"

const router = express.Router()
const userEndpoints = new UserEndpoints()

router.route('/api/users')
    .get(capture(userEndpoints.get))
    .post(capture(userEndpoints.post))

router.route('/api/users/:userId')
    .get(authenticate, capture(userEndpoints.User.get))
    .put(isAuthorized, capture(userEndpoints.User.put))

export default router


