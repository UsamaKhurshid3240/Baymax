//This File Contain Api Calls (export)
//imports
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
           return response.data.result
        })
}

export const updatee = updUser => {
 
    return axios
   
        .post("http://localhost:5000/users/update", {
            first_name: updUser.first_name,
            dob: updUser.dob,
            email: updUser.email,
            id:updUser.id            
        })
        .then(response => {

            return response.data.result.result
        })
}

export const updatepass = updUserpass => {
   
    return axios
   
        .post("http://localhost:5000/users/updatepass", {
            password:updUserpass.password,           
            id:updUserpass.id           
        })
        .then(response => {        
            return response.data.result.result
        })
}

export const sendmail = newUser => {
    
    return axios
        .post("http://localhost:5000/send/mail", {           
            email: newUser.email          
        })
        .then(response => {         
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
           localStorage.setItem('id', response.data.result.id)
            return response.data.result
        })
        .catch(err => {
            console.log(err)
        })

        

}


export const bot = newUser => {
   
    return axios
        .post("http://localhost:5005/webhooks/rest/webhook", {
            "sender": newUser.sender,
          "message":newUser.message,
           
        })
        .then(response => {      
            return response.data;
        })
}



export const deleteAccount = User => {
   
    return axios
        .post("http://localhost:5000/users/delAccount", {
            email: User.email,
           password:User.password,
           
        })
        .then(response => {          
            return response.data.result.result;
        })
}


export const questionnaire = userAns => {
    return axios
        .post("http://localhost:5000/users/questionnaire", {
            FinalAns: userAns.FinalAns,
            id: userAns.id,         
        })
        .then(response => {
            return response.data.result;
        })
}


export const deleteAllData = User => {
   
    return axios
        .post("http://localhost:5000/users/delAllData", {
            userID: User.userID,       
        })
        .then(response => { 
            return response.data.result.result;
        })
}

export const status = userID=> {
    return axios
        .post("http://localhost:5000/users/status", {
           
            userID: userID.userid,
           
        })
        .then(response => {          
            return response.data;
        })
}

export const contactmail = newUser => {
    
    return axios
        .post("http://localhost:5000/contact/mail", {
            name:newUser.name,
            email: newUser.email,
            message: newUser.message
           
        })
        .then(response => {
        return response.data
        })
}