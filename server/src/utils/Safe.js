import jwt from 'jsonwebtoken'
import crypto from "crypto"
import config from "../config"
import {TokenExpiredError} from "../helpers/errors"

export default class Safe {

    /**
     * @param payload information to stock in token
     * @param timeLimit in minutes
     * @returns {{expiration: Date, token}}
     */
    static generate_token(payload, timeLimit) {
        payload.expire = new Date((new Date()).getTime() + 60000 * timeLimit)
        return {token: jwt.sign(payload, config.jwtSecret), expiration: payload.expire}
    }

    /**
     * Verifies if token is valid and it expiration
     * @param token
     * @returns {*} data from token
     */
    static verify_token(token) {
        const data = jwt.verify(token, config.jwtSecret)
        if (new Date(Date.parse(data.expire)).getTime() < Date.now())
            throw new TokenExpiredError('Invalid token')
        return data
    }

    static key = config.secretKey
    static iv = crypto.randomBytes(16)

    static encrypt(text) {
        if (text === undefined)
            return text
        const cipher = crypto.createCipheriv('aes-256-ctr', this.key, this.iv)
        return Buffer.concat([cipher.update('' + text), cipher.final()])
    }

    static decrypt(hash) {
        if (hash === undefined)
            return hash
        const decipher = crypto.createDecipheriv('aes-256-ctr', this.key, this.iv)
        return Buffer.concat([
            decipher.update(Buffer.from(hash, 'hex')), decipher.final()
        ]).toString()
    }
}