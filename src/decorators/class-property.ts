export const classProperty = (target: any, key: string) => {
    let value = key

    const getter = () => {
        return value
    }

    const setter = (update: any) => {
        value = update
    }

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    })
}