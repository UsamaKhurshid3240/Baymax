import axios from 'axios'
import jwt from 'jwt-decode'
export const register = newUser => {
    return axios
        .post("http://localhost:5000/users/register", {
            first_name: newUser.first_name,
            dob: newUser.dob,
            email: newUser.email,
            password: newUser.password,
            gender: newUser.gender
        })
        .then(response => {
            console.log("Registered")
        })
}

export const updatee = updUser => {
    console.log("update"+ updUser.id);
    return axios
   
        .post("http://localhost:5000/users/update", {
            first_name: updUser.first_name,
            dob: updUser.dob,
            email: updUser.email,
           
            id:updUser.id
            
        })
        .then(response => {
            console.log("update"+ JSON.stringify(response.data))
           
            console.log("update"+ response.data.result.email)
            return response.data.result.email
        })
}

export const updatepass = updUserpass => {
   
    return axios
   
        .post("http://localhost:5000/users/updatepass", {
            password:updUserpass.password,
           
            id:updUserpass.id
            
        })
        .then(response => {
            console.log("update"+ JSON.stringify(response.data))
           
            console.log("update"+ response.data.result.email)
            return response.data.result.email
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


export const checkpassword = user => {
    return axios
        .post("http://localhost:5000/users/chekpass", {
            email: user.email,
            password: user.password
        })
        .then(response => {
          

            return response.data.result;
        })
        .catch(err => {
            console.log(err)
        })

        

}


export const emailcheck = newUser => {
    
    return axios
        .post("http://localhost:5000/email/check", {
            email: newUser.email,
            
        })
        .then(response => {
           console.log(response.data.result.id)
           localStorage.setItem('id', response.data.result.id)
            return response.data.result

        })
        .catch(err => {
            console.log(err)
        })

        

}
