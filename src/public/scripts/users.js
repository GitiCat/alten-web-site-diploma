(function () {
    const createUserLink = document.querySelector('.users-list > .add-link')
    const deleteLinks = document.querySelectorAll('.users-list > .item > .controls > .delete-link')
    const usersItems = document.querySelectorAll('.users-list > .item')

    createUserLink.addEventListener('click', (e) => {
        e.preventDefault()
        const currentLocation = window.location.href
        window.location.href = `${currentLocation}/add`
    })

    deleteLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            const root = e.currentTarget.parentNode.parentNode
            const userId = root.dataset.itemId

            userXhrPromise("DELETE", `/users?id=${userId}`, true)
                .then(() => {
                    root.remove()
                })
        })
    })

    const userXhrPromise = (method, url, async) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url, async)
            xhr.onload = () => {
                if(xhr.status === 200) {
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
            xhr.send()
        })
    }
})()