const xhrPromise = (method, url, isAsync, body = null) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url, isAsync)

        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status < 300 ) {
                resolve(xhr.response)
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                })
            }
        }

        xhr.onerror = () => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            })
        }

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(body)
    })
}