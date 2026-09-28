from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URL"] = "mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2"
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False

db = SQLAlchemy(app)

