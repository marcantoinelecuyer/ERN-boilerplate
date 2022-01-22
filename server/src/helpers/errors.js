export class CustomError extends Error {
    constructor(msg, prettyError, status = 400) {
        super(msg)
        this.status = status
        this.prettyError = prettyError
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, CustomError)
    }
}

export class UniqueConstraintError extends CustomError {
    constructor(value, prettyError) {
        super(value + ' already exists.', prettyError, 409)
    }
}

export class InvalidPropertyError extends CustomError {
    constructor(msg, prettyError) {
        super(msg, prettyError)
    }
}

export class RequiredParameterError extends CustomError {
    constructor(param, prettyError) {
        super(param + ' is required.', prettyError)
    }
}

export class ResourceNotFoundError extends CustomError {
    constructor(resource, prettyError) {
        super(resource + ' not found.', prettyError, 404)
    }
}

export class TokenExpiredError extends CustomError {
    constructor(resource, prettyError) {
        super('Invalid token.', prettyError, 401)
    }
}

export class UnauthorizedAccessError extends CustomError {
    constructor(prettyError) {
        super('You are trying to access a forbidden resource.', prettyError, 403)
    }
}