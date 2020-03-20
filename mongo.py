from flask import Flask, jsonify, request, json 
from flask_pymongo import PyMongo 
from bson.objectid import ObjectId 
from datetime import datetime 
from flask_bcrypt import Bcrypt 
from flask_cors import CORS
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token
from flask_mail import Mail, Message
import random
import datetime



app = Flask(__name__)
app.config.update(
	DEBUG=True,
	#EMAIL SETTINGS
	MAIL_SERVER='smtp.gmail.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME = '****@gmail.com',
	MAIL_PASSWORD = '*******'
	)
mail = Mail(app)
app.config['MONGO_DBNAME'] = 'reactloginreg'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/reactloginreg'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)        
jwt = JWTManager(app)

CORS(app)

@app.route('/users/register', methods=["POST"])
def register():
    users = mongo.db.users 
    first_name = request.get_json()['first_name']
    dob= request.get_json()['dob']
    email = request.get_json()['email']
    
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    
    now = datetime.datetime.now()
    age = str(now.year-int(dob[slice(0,4)]))

    user_id = users.insert({
        'first_name': first_name,
        'dob': dob,
        'email': email,
        'password': password,
        'age':age,
        'created': now 
    })

    new_user = users.find_one({'_id': user_id})

    result = {'email': new_user['email'] + ' registered'}

    return jsonify({'result' : result})

    


@app.route('/send/mail', methods=['POST'])
def send_mail():

		msg = Message("Email Verification",sender="*****@gmail.com",recipients=[str(request.get_json()['email'])])
		msg.body = "Verification Code : "+str(random.randint(9999,99999))        
		mail.send(msg)
        
		return msg.body
	


@app.route('/users/login', methods=['POST'])
def login():

		

        
    users = mongo.db.users 
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""

   

    response = users.find_one({'email': email})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
                'first_name': response['first_name'],
                'dob': response['dob'],
                'email': response['email']
            })
            result = jsonify({'token':access_token})
        else:
            result = jsonify({"error":"Invalid username and password"})
    else:
        result = jsonify({"result":"No results found"})
    return result 

if __name__ == '__main__':
    app.run(debug=True)
