from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import numpy as np
app = Flask(__name__)

is_signin = 0
current_id = 4
sales = [
        {
            "id": 1,
            "salesperson": "Streak 1",
            "client": "6 Day",
            "reams": 20
        },
        {
            "id": 2,
            "salesperson": "Streak 2",
            "client": "3 Day",
            "reams": 30
        },
        {
            "id": 3,
            "salesperson": "Streak 3",
            "client": "10 day",
            "reams": 70
        },
    ]

clients = [
 "Shake Shack",
 "Toast",
 "Computer Science Department",
 "Teacher's College",
 "Starbucks",
 "Subsconsious",
 "Flat Top",
 "Joe's Coffee",
 "Max Caffe",
 "Nussbaum & Wu",
 "Taco Bell",
]

# ROUTES

@app.route('/hi')
def hello():
   return 'Hi hi hi hi hi hi hi hi hi'


@app.route('/')
def hello_world():
   return render_template('welcome.html')   

@app.route('/home')
def home():
   return render_template('home.html')   

@app.route('/log_sales')
def log_sales():
    data = {
        "sales": sales,
        "clients": clients
    }
    return render_template('log_sales.html', data=data)

@app.route('/community')
def community():
    data = {
        "sales": sales,
        "clients": clients
    }
    return render_template('Community.html', data=data)

@app.route('/STE')
def STE():
    data = {
        "sales": sales,
        "clients": clients
    }
    return render_template('STE.html', data=data)

@app.route('/Wallet')
def Wallet():
    global is_signin
    data = {
        "sales": sales,
        "clients": clients,
        "select": is_signin
    }
    return render_template('Wallet.html', data=data)

# AJAX FUNCTIONS


@app.route('/send_signin', methods=['GET', 'POST'])
def send_signin():
    global is_signin
    is_signin = 1
    data = {
        "sales": sales,
        "clients": clients
    }
    return jsonify(data = data)
    
# ajax for people.js
@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale():
    global sales 
    global current_id 
    global clients

    json_data = request.get_json() 
    salesperson =  json_data["salesperson"] 
    client = json_data["client"] 
    reams = json_data["reams"] 
    
    # add new entry to array with 
    # a new id and the name the user sent in JSON
    new_id = current_id 
    new_name_entry = {
        "id":  current_id,
        "salesperson": salesperson,
        "client": client,
        "reams": reams
    }
    sales.insert(0,new_name_entry)
    c = np.array(clients)
    r = np.where(c==client)
    if len(r[0]) == 0:
        clients.append(client)

    count=1
    for value in sales:
        value["id"] = count
        count+=1
    
    current_id = count
    
    data = {
        "sales": sales,
        "clients": clients
    }
    current_id += 1
    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(data = data)
 
@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale():
    global sales 
    global current_id 

    json_data = request.get_json() 
    id =  json_data["id"] 
    print(id)
    
    # add new entry to array with 
    # a new id and the name the user sent in JSON

    count = 0
    for value in sales:
        if value["id"]==id:
            sales.pop(count)
        count = count+1

    count=1
    for value in sales:
        value["id"] = count
        count+=1
    
    current_id = count

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(data = sales)

if __name__ == '__main__':
   app.run(debug = True)





