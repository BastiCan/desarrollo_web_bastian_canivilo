from flask import Flask, request, render_template, redirect, url_for, session
from database import db
import hashlib
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Auth Routs ---
@app.route("/registro", methods=["GET", "POST"])
def registro():
    



