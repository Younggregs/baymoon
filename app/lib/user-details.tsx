
const user = () => {
    let token = ""
    let name = ""
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token') || ""
        name = localStorage.getItem('name') || ""
    }
    return { token, name }
}

export default user