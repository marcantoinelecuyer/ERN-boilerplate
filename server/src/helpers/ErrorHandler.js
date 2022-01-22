export default function makeHttpError(e) {
    console.log(e)
    if (e.status) {
        let prettyError = e.prettyError
        return {status: e.status, data: {error: e.message, prettyError}}
    } else
        return {status: 500, data: {error: 'Something went wrong.'}}
}