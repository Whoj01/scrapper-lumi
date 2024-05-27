export function successesRequest(message, statusCode, data = []) {
    return {
        statusCode,
        body: {
            msg: message,
            data,
            ok: true,
            status: statusCode,
        },
    };
}
export function errorRequest(message, statusCode) {
    return {
        statusCode,
        body: {
            msg: message,
            ok: false,
            status: statusCode,
        },
    };
}
