class ApiError extends Error {
    private _status: number
    private _message: string | []
    
    constructor(status: number, message: string | []) {
        super();
        this._status = status
        this._message = message
    }


    get status() { return this._status }
    get msg() { return this._message }

    static badRequest(message: string | []) {
        return new ApiError(404, message)
    }

    static forbidden(message: string | []) {
        return new ApiError(401, message)
    }

    static internal(message: string | []) {
        return new ApiError(500, message)
    }
}

export default ApiError