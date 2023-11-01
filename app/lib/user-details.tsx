
const user = () => {
    let token = ""
    let first_name = ""
    let last_name = ""
    let phone_number = ""
    let email = ""
    let permissions = []
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token') || ""
        first_name = localStorage.getItem('first_name') || ""
        last_name = localStorage.getItem('last_name') || ""
        phone_number = localStorage.getItem('phone_number') || ""
        email = localStorage.getItem('email') || ""
        permissions = localStorage.getItem('permissions')?.split(',') || []
    }
    return { token, first_name, last_name, phone_number, email }
}

export default user