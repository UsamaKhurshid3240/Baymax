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
    MAIL_USERNAME = 'baymaxun@gmail.com',
    MAIL_PASSWORD = '123-baymax.UN'
    )
mail = Mail(app)
app.config['MONGO_DBNAME'] = 'Baymax'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/baymax'
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
    gender = request.get_json()['gender']

    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    
    now = datetime.datetime.now()
    age = str(now.year-int(dob[slice(0,4)]))

    user_id = users.insert({
        'first_name': first_name,
        'dob': dob,
        'email': email,
        'password': password,
        'gender':gender,
        'age':age,
        'created': now 
    })

    new_user = users.find_one({'_id': user_id})

 

    return jsonify({'result' : "Registered Successfully"})

    

@app.route('/users/update', methods=["POST"])
def update():
    users = mongo.db.users 
    first_name = request.get_json()['first_name']
    dob= request.get_json()['dob']
    email = request.get_json()['email']

   
    idd = request.get_json()['id']
    now = datetime.datetime.now()
    age = str(now.year-int(dob[slice(0,4)]))
   
    # Updating fan quantity form 10 to 25. 
    filter = { '_id': ObjectId(idd) } 
  
    # Values to be updated. 
    newvalues = { "$set": {  'first_name': first_name,
        'dob': dob,
        'email': email,
       
        'age':age,
        'created': now  } } 
 
    users.update_one(filter, newvalues)  
   
  

    result = {'result':"Update Successsfully"}

    return jsonify({'result' : result})

    
@app.route('/users/delAccount', methods=["POST"])
def delete():
    users = mongo.db.users 
   
    email = request.get_json()['email']
    password = request.get_json()['password']

    response = users.find_one({'email': email})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
           myquery = { "email": response['email'] }

           users.delete_one(myquery)

           result = {'result':"Delete Successfully"}
        else:
            result = {"result":"Nan"}
    else:
        result = {"result":"No results found"}
 

    return jsonify({'result' : result})


@app.route('/users/delAllData', methods=["POST"])
def delAllData():
    users = mongo.db.questionnaire 
    userstatus = mongo.db.statuses 

    idd = request.get_json()['userID']
    
   
    # Updating fan quantity form 10 to 25. 
  
  
    users.delete_many({"userID": idd})
    userstatus.delete_many({"userID": idd})
  

    result = {'result':"Delete Successfully"}

    return jsonify({'result' : result})
    
@app.route('/users/updatepass', methods=["POST"])
def update_pass():
    users = mongo.db.users 

    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')

    idd = request.get_json()['id']
    now = datetime.datetime.now()
    # Updating fan quantity form 10 to 25. 
    filter = { '_id': ObjectId(idd) } 
  
    # Values to be updated. 
    newvalues = { "$set": {  
        'password':password,
        'created': now  } } 
 
    users.update_one(filter, newvalues)  
   
  

    result = {'result':"Update Successsfully"}

    return jsonify({'result' : result})

    

@app.route('/send/mail', methods=['POST'])

def send_mail():

        msg = Message("Email Verification",sender="baymaxun@gmail.com",recipients=[str(request.get_json()['email'])])
        msg.body = "Verification Code : "+str(random.randint(9999,99999))        
        mail.send(msg)
        
        return msg.body
    

@app.route('/contact/mail', methods=['POST'])

def contact_mail():

        name = request.get_json()['name']
        email = request.get_json()['email']
        message = request.get_json()['message']

        
        msg = Message("Contact Support",sender="baymaxun@gmail.com",recipients=["baymaxun@gmail.com"])
        msg.body = "Name :"+name+"\r\n"+"Email : "+email+"\r\n"+"\r\n"+message
        mail.send(msg)
        
        return jsonify({'result' : "Sent Mail"})
    
    

@app.route('/email/check', methods=['POST'])

def email_check():

        

        
    users = mongo.db.users  
    email = request.get_json()['email']
    result=""
   

    result = users.find_one({'email': email})
    res="Not Found"
    if result is None:
        result={'email': res}
    else:
         result =  {
                
                'email': result['email'],
                'id':str(result['_id']),
                
            }
      
    

    

    return jsonify({'result' : result})

   

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
                'email': response['email'],
                'id':str(response['_id']),
                'age':response['age'],
                'gender':response['gender'],
                'date':response['created']
            })
            
            result = jsonify({'token':access_token})
        else:
            result = jsonify({"token":"Invalid username and password"})
    else:
        result = jsonify({"token":"No results found"})
 
    return result 

@app.route('/users/chekpass', methods=['POST'])
def check_pass(): 

        

        
    users = mongo.db.users 
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""

   

    response = users.find_one({'email': email})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
           
            result = jsonify({'result':"Matched"})
        else:
            result = jsonify({"result":"Invalid username and password"})
    else:
        result = jsonify({"result":"No results found"})
 
    return result 



@app.route('/users/questionnaire', methods=["POST"])
def questionnaire():
    usersques = mongo.db.questionnaire 
    FinalAns= request.get_json()['FinalAns']
    userid= request.get_json()['id']
    
    
    now = datetime.datetime.now()
    

    usersques.insert({
        'InitialStatus': FinalAns,
        'userID': userid,
        'created': now 
    })

   

    result = jsonify({"result":"Successfully Saved"})

    return result

    

@app.route('/users/status', methods=['POST'])
def status():

        

        
    users = mongo.db.statuses 
    userid = request.get_json()['userID']
    
   
    status=[]

    
    x = users.find({'senderID': userid},{"_id":0,'status': "","date":""})
    for data in x:
        status.append(data)
      
    result = jsonify({"result":status})
    return result 
  

if __name__ == '__main__':
    app.run(debug=True)
