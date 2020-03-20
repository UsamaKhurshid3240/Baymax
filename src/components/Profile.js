import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';
import $ from 'jquery'
class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: ''
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.identity.first_name,
            last_name: decoded.identity.last_name,
            email: decoded.identity.email,
       
        })

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                    $('#imagePreview').hide();
                    $('#imagePreview').fadeIn(650);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#imageUpload").change(function() {
            readURL(this);
        });
         
    }

    render () {
        return (
  
           
            <div className="container">
                <div className="jumbotron pf-cnt">
                   
                    
                    {/* <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.first_name}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.last_name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>
                    </table> */}

<div className="col-sm-8 col-md-10 col-lg-12 nm">
<div className="avatar-upload">
        <div className="avatar-edit">
            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
            <label htmlFor="imageUpload"></label>
        </div>
        <div className="avatar-preview  ">
            <div id="imagePreview" >
            </div>
        </div>
    </div>
                    {/* <div className="pf-pic"></div> */}
                    <h1 className="name">{this.state.first_name} {this.state.last_name}</h1>
                    <h2 className="mail">{this.state.email} </h2>
                    </div>
                </div>
            </div> 
          
       

        )
    }
}

export default Profile