from flask import Flask, jsonify
app = Flask(__name__)

import serial

ser = serial.Serial()
ser.baudrate = 9600
ser.port = 'COM3'
ser.open()
print('connection:', ser)

@app.route('/api/ok')
def ok():
    ser.write(b'k')
    print('ser.is_open', ser.is_open)
    return jsonify({ 'open': ser.is_open })

@app.route('/api/cmd/<cmd>')
def cmd(cmd):
    print('running cmd:', cmd)
    ser.write(cmd.encode())
    return 'done'

app.run(port=5000)
