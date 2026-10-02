from flask import Flask, request, render_template, redirect, url_for, flash
from datetime import datetime
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os
from database.db import (
    SessionLocal,
    Region, Comuna, Voluntario, Ave, Avistamiento,
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
    with SessionLocal() as session:
        ##Vemos los dos ultimos avistamientos
        ultimos_orm = session.query(Avistamiento).order_by(Avistamiento.fecha_hora.desc()).limit(2).all()
        ultimos_avistamientos = [a.to_dict() for a in ultimos_orm]
        
        return render_template("html/inicio.html", avistamientos=ultimos_avistamientos)

@app.route("/registro", methods=["GET", "POST"])
@app.route("/voluntario", methods=["GET", "POST"])
def voluntario():
    with SessionLocal() as session:
        regiones = session.query(Region).order_by(Region.id).all()
        comunas = session.query(Comuna).order_by(Comuna.nombre).all()

        datos_chile = {}
        for r in regiones:
            datos_chile[r.id] = {"nombre": r.nombre.strip(), "comunas": []}
        for c in comunas:
            if c.region_id in datos_chile:
                datos_chile[c.region_id]["comunas"].append({"id": c.id, "nombre": c.nombre.strip()})

        if request.method == "POST":
            nombre = request.form.get("nombre")
            email = request.form.get("email")
            telefono = request.form.get("telefono")
            comuna_id = request.form.get("select-comuna") or request.form.get("comuna_id")

            if not nombre or not email or not comuna_id or not telefono:
                return render_template("html/registro.html", datos_chile=datos_chile, error="Todos los campos son obligatorios.")

            if get_voluntary_by_email(email):
                return render_template("html/registro.html", datos_chile=datos_chile, error="El correo electrónico ya se encuentra registrado.")

            nuevo_voluntario = create_voluntary(
                nombre=nombre,
                email=email,
                telefono=telefono,
                fecha_registro=datetime.now(),
                comuna_id=int(comuna_id)
            )

            flash("Registro de voluntario exitoso. ¿Deseas informar un avistamiento para este voluntario?", "success")
            return render_template("html/exito_registro.html", voluntario=nuevo_voluntario)

        return render_template("html/registro.html", datos_chile=datos_chile)


@app.route("/avistamiento", methods=["GET", "POST"])
def avistamiento():
    with SessionLocal() as session:
        voluntarios = session.query(Voluntario).order_by(Voluntario.nombre).all()
        aves = session.query(Ave).order_by(Ave.nombre).all()

        if request.method == "POST":
            voluntario_id = request.form.get("select_voluntario") or request.form.get("voluntario_id")
            ave_id = request.form.get("select-ave") or request.form.get("ave_id")
            fecha_hora_str = request.form.get("fecha_hora")
            lugar = request.form.get("lugar", "").strip()
            descripcion = request.form.get("descripcion", "").strip()
            archivos = request.files.getlist("archivos")

            if not voluntario_id or not ave_id or not lugar or not fecha_hora_str or not descripcion:
                return render_template("html/avistamiento.html", voluntarios=voluntarios, aves=aves, error="Todos los campos son obligatorios.")

            if not archivos or len(archivos) == 0 or archivos[0].filename == '':
                return render_template("html/avistamiento.html", voluntarios=voluntarios, aves=aves, error="Debe adjuntar al menos un archivo o foto.")

            try:
                fecha_hora = datetime.strptime(fecha_hora_str, "%Y-%m-%dT%H:%M")
            except (ValueError, TypeError):
                return render_template("html/avistamiento.html", voluntarios=voluntarios, aves=aves, error="Formato de fecha inválido.")

            nuevo_avistamiento = create_avistamient(
                voluntario_id=int(voluntario_id),
                ave_id=int(ave_id),
                fecha_hora=fecha_hora,
                lugar=lugar,
                descripcion=descripcion
            )

            os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

            for file in archivos:
                if file and file.filename != '':
                    nombre_original = secure_filename(file.filename)
                    nombre_guardado = f"{datetime.now().timestamp()}_{nombre_original}"
                    ruta_completa = os.path.join(app.config['UPLOAD_FOLDER'], nombre_guardado)
                    
                    file.save(ruta_completa)

                    create_register(
                        ruta_archivo=f"uploads/{nombre_guardado}",
                        nombre_archivo=nombre_original,
                        avistamiento_id=nuevo_avistamiento.id
                    )

            flash("¡Avistamiento e imágenes registrados con éxito!", "success")
            return redirect(url_for("inicio"))

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

