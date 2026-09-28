from flask import Flask, request, render_template, redirect, url_for, session
from database import db
#from werkzeug.utils import secure_filename
import hashlib
import filetype
import os
from datetime import datetime

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Auth Routs ---
@app.route("/registro", methods=["GET", "POST"])
def registro():
    if request.method = "POST"
        nombre = request.form.get("nombre")
        emaill = request.form.get("email")
        telefono = request.form.get("telefono")
        comuna_id = request.form.get("select-comuna")


    



