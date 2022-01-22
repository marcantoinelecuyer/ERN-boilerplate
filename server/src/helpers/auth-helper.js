import Safe from "../utils/Safe"
import makeHttpError from "./ErrorHandler"
import {UnauthorizedAccessError} from "./errors"

/**
 * Checks authentication for protection against unauthenticated access
 */
export const requireLogin = (req, res, next) => {
    try {
        extract_auth(req)
        if (!req.data.auth)
            throw new UnauthorizedAccessError()
    } catch (err) {
        const httpError = makeHttpError(err)
        return res.status(httpError.status).json(httpError.data)
    }
    next()
}

/**
 * User extraction for user sending the request
 * Verifying cookie and Bearer
 * User asking resource doesn't have to be its creator
 * @param req
 * @param res
 * @param next
 */
export const authenticate = (req, res, next) => {
    try {
        extract_auth(req)
    } catch (err) {
        const httpError = makeHttpError(err)
        return res.status(httpError.status).json(httpError.data)
    }
    next()
}


export const isAuthorized = (req, res, next) => {
    try {
        extract_auth(req)
        if (!req.data.auth || req.data.auth !== req.params.userId)
            throw new UnauthorizedAccessError()
    } catch (err) {
        const httpError = makeHttpError(err)
        return res.status(httpError.status).json(httpError.data)
    }
    next()
}


const extract_auth = (req) => {
    if (!req.data)
        req.data = {}

    const bearer = req.headers.authorization && req.headers.authorization !== "undefined" ?
        getCookie('t', req.headers.cookie) : undefined
    if (bearer) {
        const {_id, cookieStain} = Safe.verify_token(bearer)
        req.data.auth = _id
        req.data.cookieStain = cookieStain
    }
}
/**
 * Cookie extraction
 * @param {string} name     cookie to be extracted
 * @param {string} cookies  cookies from request
 * @returns {string}        cookie-content
 */
const getCookie = (name, cookies) => {
    if (cookies === undefined)
        return undefined
    const cookie = cookies.split('; ').find(c => c.indexOf(name + '=') !== -1)
    if (!cookie)
        return cookie
    return cookie.substr(1 + name.length)
}