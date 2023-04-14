from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import numpy as np
app = Flask(__name__)


current_id = 4
sales = [
        {
            "id": 1,
            "salesperson": "James D. Halpert",
            "client": "Shake Shack",
            "reams": 1000
        },
        {
            "id": 2,
            "salesperson": "Stanley Hudson",
            "client": "Toast",
            "reams": 4000
        },
        {
            "id": 3,
            "salesperson": "Michael G. Scott",
            "client": "Computer Science Department",
            "reams": 10000
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

@app.route('/log_sales')
def log_sales():
    data = {
        "sales": sales,
        "clients": clients
    }
    return render_template('log_sales.html', data=data)  


# AJAX FUNCTIONS

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





