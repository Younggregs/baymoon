
const user = () => {
    let token = ""
    let first_name = ""
    let last_name = ""
    let phone_number = ""
    let email = ""
    let profile_picture = ""
    let title = ""
    let permissions: string[] = []
    let landlord = ""
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token') || ""
        first_name = localStorage.getItem('first_name') || ""
        last_name = localStorage.getItem('last_name') || ""
        phone_number = localStorage.getItem('phone_number') || ""
        email = localStorage.getItem('email') || ""
        permissions = localStorage.getItem('permissions')?.split(',') || []
        landlord = localStorage.getItem('landlord') || ""
        profile_picture = localStorage.getItem('profile_picture') || ""
        title = localStorage.getItem('title') || ""
    }
    return { token, first_name, last_name, phone_number, email, profile_picture, title, permissions, landlord }
}

export default user