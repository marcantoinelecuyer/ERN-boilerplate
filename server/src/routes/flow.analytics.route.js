import express from 'express'
import UserEndpoints from '../endpoints/user.endpoint'
import capture from "../helpers/capture"
import {authenticate, isAuthorized} from "../helpers/auth-helper"

const router = express.Router()
const userEndpoints = new UserEndpoints()

// Map the page-flows
router.route('/api/analytics/flows')
    // .get(capture(userEndpoints.get))
    // .post(capture(userEndpoints.post))

// Info about a component-flow
router.route('/api/analytics/flows/:flowId')
    // .get(authenticate, capture(userEndpoints.User.get))
    // .put(isAuthorized, capture(userEndpoints.User.put))

export default router


