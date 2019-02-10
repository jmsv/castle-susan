from flask import Flask
app = Flask(__name__)

import serial

# ser = serial.Serial()
# ser.baudrate = 9600
# ser.port = 'COM3'
# ser.open()

# print(ser.name)
# ser.write(b's')
# ser.close()

@app.route('/api/ok')
def ok():
    return 'ok'

@app.route('/api/cmd/<char>')
def cmd(char):
    print(char)

@app.route('/api/is-open')
def is_open():
    return ser.is_open

try:
    app.run(port=5000)
except Exception as e:
    # ser.close()
    print(e)
