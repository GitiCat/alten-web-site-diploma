(function () {
    const form = document.querySelector('form')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const action = e.currentTarget.getAttribute('action')
        const method = e.currentTarget.getAttribute('method')
        const formData = new FormData(form)

        try {
            const xhrResult = await xhrPromise(method, action, true, formData)
            console.log(xhrResult);
        } catch(error) {
            console.log(error)
        }
    })

    form.addEventListener('reset', (e) => {

    })
})()