import formidable from "formidable"
import makeHttpError from "./ErrorHandler"

/**
 * Parse an http-request extracting important infos
 * @param req
 * @returns {unknown[]}
 */
const parse = (req = {}) => {
    let bearer
    if (req.headers.authorization)
        bearer = req.headers.authorization.split(' ')[1]
    return Object.freeze({
        path: req.path,
        method: req.method,
        bearer,
        params: req.params,
        query: req.query,
        body: req.body,
        form: req.incomingForm,
        ...(req.data ? req.data : {})
    })
}

/**
 * Capture a request, format infos received and sends back the response
 * @param endpoint  function that handles the request
 * @param withFile  expect a file
 * @returns express-response
 */
export default (endpoint, withFile) => async (req, res) => {
    let httpReq
    try {
        // Parse request
        if (withFile) { // File was sent
            let form = new formidable.IncomingForm()
            form.keepExtensions = true
            req.incomingForm = await new Promise(function (resolve, reject) {
                form.parse(req, function (err, fields, files) {
                    if (err)
                        return reject(err)
                    resolve({fields, files});
                })
            })
        }
        // Extract infos from request
        httpReq = parse(req)
    } catch (err) {
        return res.status(500).json({error: 'Could not parse request.'})
    }
    endpoint(httpReq)
        .then(({data, file, status, cookie, apply}) => {
            // Apply a specific action to response
            if (apply)
                apply(res)
            // Add cookie to client
            if (cookie)
                res.cookie(cookie.name, cookie.payload, cookie.options)
            // Send response
            if (file) { // Respond with file
                res.set('Content-Type', file.ContentType)
                return res.status(status).send(file.Body)
            } else      // Respond with json
                return res.status(status).json(data)
        })
        // Handle server error
        .catch(e => {
            const httpError = makeHttpError(e)
            res.status(httpError.status).json(httpError.data)
        })
}