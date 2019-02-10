dev_mode=1

from flask import Flask, jsonify
app = Flask(__name__)

import serial

if !dev_mode:
    ser = serial.Serial()
    ser.baudrate = 9600
    ser.port = 'COM3'
    ser.open()
    print('connection:', ser)

@app.route('/api/ok')
def ok():
    if dev_mode: return jsonify({ open: False })

    ser.write(b'k')
    return jsonify({ open: ser.is_open })

@app.route('/api/cmd/<cmd>')
def cmd(cmd):
    print('running cmd:', cmd)
    if !dev_mode: ser.write(cmd.encode())
    return 'done'
