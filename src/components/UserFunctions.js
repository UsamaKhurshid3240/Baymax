import axios from 'axios'

export const register = newUser => {
    return axios
        .post("http://localhost:5000/users/register", {
            first_name: newUser.first_name,
            dob: newUser.dob,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log("Registered")
        })
}

export const sendmail = newUser => {
    return axios
        .post("http://localhost:5000/send/mail", {
            email: newUser.email
        })
        .then(response => {
            console.log("Mail Sent"+response.data)
        return response.data
        })
}


export const login = user => {
    return axios
        .post("http://localhost:5000/users/login", {
            email: user.email,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })

}