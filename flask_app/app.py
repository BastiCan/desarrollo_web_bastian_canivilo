from flask import Flask, request, render_template, redirect, url_for, flash
from werkzeug.utils import secure_filename
from datetime import datetime
#import hashlib
import filetype
import os
from database.db import (
    SessionLocal,
    Comuna, Voluntario, Ave, Avistamiento,
    get_voluntary_by_email,
    create_voluntary,
    create_avistamient,
    create_register
)




UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Auth Routs ---
@app.route("/")

@app.route("/inicio")
def inicio():
    return render_template("HTML/inicio.html")

@app.route("/voluntario", methods=["GET", "POST"])
def voluntario():
    if request.method == "POST":
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        telefono = request.form.get("telefono")
        comuna_id = request.form.get("select-comuna")

        ##Validar que los campos no esten vacíos
        if not nombre or not email or not comuna_id:
            flash("Todos estos campos son obligatorios", "error")
            return redirect(url_for("voluntario"))

        ##Validar si el voluntario esta en la base de datos
        if get_voluntary_by_email(email):
            flash("El correo electrónico ya se encuentra registrado.", "error")
            return redirect(url_for("voluntario"))

        #Guardamos nuevo voluntario
        create_voluntary(
            nombre=nombre,
            email=email,
            telefono=telefono,
            fecha_registro=datetime.now(),
            comuna_id=int(comuna_id)
        )
            
        flash("Registro de voluntario exitoso.", "success")
        return redirect(url_for("listado"))

    ##Si es un GET
    with SessionLocal() as session:
        comunas = session.query(Comuna).order_by(Comuna.nombre).all()
        return render_template("html/voluntario.html", comunas=comunas)


@app.route("/avistamiento", methods=["GET", "POST"])
def avistamiento():
    if request.method == "POST":
        voluntario_id = request.form.get("select_voluntario") or request.form.get("voluntario_id")
        ave_id = request.form.get("select-ave") or request.form.get("ave_id")
        fecha_hora_str = request.form.get("fecha_hora")
        lugar = request.form.get("lugar")
        descripcion = request.form.get("descripcion")

        ##Ver si la fecha esta bien ingresada
        try:
            fecha_hora = datetime.strftime(fecha_hora_str, "%Y-%m-%dT%H:%M")
        except (ValueError, TypeError):
            fecha_hora = datetime.now()

        ##Guardamos el avistamiento
        create_avistamient(
            voluntario_id= int(voluntario_id),
            ave_id= int(ave_id),
            fecha_hora= fecha_hora,
            lugar= lugar,
            descripcion= descripcion
        )

        flash("Avistamiento registrado correctamente.", "success")
        return redirect(url_for("listado"))

    ##Si es un GET
    with SessionLocal() as session:
        voluntarios = session.query(Avistamiento).order_by(Avistamiento.fecha_hora.desc()).all()
        aves = session.query(Ave).order_by(Ave.nombre).all()
        return render_template("html/avistamiento.html", voluntarios=voluntarios, aves=aves)

@app.route("/listado")
def listado():
    with SessionLocal() as session:
        avistamientos_orm = session.query(Avistamiento).order_by(Avistamiento.fecha_hora.desc()).all()
        avistamientos_list = [a.to_dict() for a in avistamientos_orm]
        return render_template("html/listado.html", avistamientos=avistamientos_list)


@app.route("/estadisticas")
def estadisticas():
    return render_template("HTML/estadísticas.html")
    

if __name__ == "__main__":
    app.run(debug=True, port=5000)

