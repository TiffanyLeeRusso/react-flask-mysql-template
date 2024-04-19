from flask import Flask, render_template, request
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__, static_url_path='', template_folder='public')

# MySQL setups
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'admin'
app.config['MYSQL_DB'] = 'mytestdb'

# PROD_REMOVE CORS stuff below
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

def get_table(table):
  cursor = mysql.connection.cursor()
  cursor.execute(
      ''' SELECT * FROM %s ''' % table)
  mysql.connection.commit()
  data = cursor.fetchall()
  row_headers=[x[0] for x in cursor.description] # extract row headers
  cursor.close()
  json_data=[]
  for result in data:
    json_data.append(dict(zip(row_headers,result)))
  return json_data

@app.route('/users', methods=['GET'])
@cross_origin() # PROD_REMOVE this line
def get_users():
    if request.method == 'GET':
        try:
          json_data = get_table("users")
          return { 'status': '200', 'data': json_data }
        except Exception as e:
          print("get_users error: %s", str(e))
    return { 'status': '500' }

@app.route('/users', methods=['POST'])
@cross_origin() # PROD_REMOVE this line
def add_user():
    if request.method == 'POST':
        try:
          data = request.get_json()
          print (data)
          attrs = []
          values = []
          for (attribute, value) in data.items():
            attrs.append(attribute)
            values.append("\"" + value + "\"")
          attrs = ', '.join(attrs)
          values = ', '.join(values)

          # insert the row into the users table
          cursor = mysql.connection.cursor()
          cursor.execute(
            ''' 
INSERT INTO users (%s) VALUES (%s); ''' % (attrs, values))
          mysql.connection.commit()
          return { 'status': '200' }
        except Exception as e:
          print("add_user error: %s", str(e))
    return { 'status': '500' }

@app.route('/users', methods=['PUT'])
@cross_origin() # PROD_REMOVE this line
def update_user():
    if request.method == 'PUT':
        try:
          data = request.get_json()
          print(data)
          colVals = []
          for (attribute, value) in data.items():
            colVals.append(attribute + "=" + "\"" + str(value) + "\"")
          colVals = ', '.join(colVals)

          cursor = mysql.connection.cursor()

          # update the row in the users table
          cursor.execute(
            ''' 
UPDATE users SET %s WHERE id=%s; ''' % (colVals, data["id"]))
          mysql.connection.commit()
          return { 'status': '200' }
        except Exception as e:
          print("update_user error: %s", str(e))
    return { 'status': '500' }
    
@app.route('/users', methods=['DELETE'])
@cross_origin() # PROD_REMOVE this line
def delete_user():
    if request.method == 'DELETE':
      try:
          data = request.get_json()
          cursor = mysql.connection.cursor()
          cursor.execute(
            ''' 
DELETE FROM users WHERE id=%s; ''' % data["id"])

          mysql.connection.commit()
          return { 'status': '200' }
      except Exception as e:
        print("delete_user error: %s", str(e))
    return { 'status': '500' }

# Running app
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
