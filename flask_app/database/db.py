from sqlalchemy import create_engine, Column, Integer, BigInteger, String, ForeignKey, DateTime, Text, func
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import datetime

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# --- Models ---

class Region(Base):
    __tablename__ = 'region'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)

    comunas = relationship("Comuna", back_populates="region")


class Comuna(Base):
    __tablename__ = 'comuna'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(Integer, ForeignKey('region.id'), nullable=False)

    region = relationship("Region", back_populates="comunas")
    voluntarios = relationship("Voluntario", back_populates="comuna")


class Voluntario(Base):
    __tablename__ = 'voluntario'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(80), nullable=False)
    telefono = Column(String(15), nullable=False)
    fecha_registro = Column(DateTime, nullable=False)
    comuna_id = Column(Integer, ForeignKey('comuna.id'), nullable=False)

    comuna = relationship("Comuna", back_populates="voluntarios")
    avistamientos = relationship("Avistamiento", back_populates="voluntario")


class Ave(Base):
    __tablename__ = 'ave'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)

    avistamientos = relationship("Ave", back_populates="ave") if False else relationship("Avistamiento", back_populates="ave")


class Avistamiento(Base):
    __tablename__ = 'avistamiento'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    voluntario_id = Column(Integer, ForeignKey('voluntario.id'), nullable=False)
    ave_id = Column(Integer, ForeignKey('ave.id'), nullable=False)
    fecha_hora = Column(DateTime, nullable=False)
    lugar = Column(String(200), nullable=False)
    descripcion = Column(Text(500), nullable=True)

    voluntario = relationship("Voluntario", back_populates="avistamientos")
    ave = relationship("Ave", back_populates="avistamientos")
    registros = relationship("Registro", back_populates="avistamiento")
    comentarios = relationship("Comentario", back_populates="avistamiento", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "lugar": self.lugar,
            "fecha_hora": self.fecha_hora.strftime("%Y-%m-%d %H:%M") if self.fecha_hora else "",
            "descripcion": self.descripcion,
            "ave_nombre": self.ave.nombre if hasattr(self, 'ave') and self.ave else "",
            "voluntario_nombre": self.voluntario.nombre if hasattr(self, 'voluntario') and self.voluntario else "",
            "registros": [
                {
                    "id": r.id,
                    "ruta_archivo": r.ruta_archivo,
                    "nombre_archivo": r.nombre_archivo
                } for r in self.registros
            ] if hasattr(self, 'registros') else []
        }   


class Registro(Base):
    __tablename__ = 'registro'

    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    avistamiento_id = Column(Integer, ForeignKey('avistamiento.id'), nullable=False)

    avistamiento = relationship("Avistamiento", back_populates="registros")


class Comentario(Base):
    __tablename__ = 'comentario'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    texto = Column(String(300), nullable=False)
    fecha = Column(DateTime, default=datetime.now, nullable=False)
    avistamiento_id = Column(Integer, ForeignKey('avistamiento.id'), nullable=False)

    avistamiento = relationship("Avistamiento", back_populates="comentarios")

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "texto": self.texto,
            "fecha": self.fecha.strftime("%Y-%m-%d %H:%M:%S") if self.fecha else "",
            "avistamiento_id": self.avistamiento_id
        }

# --- Database Functions ---

def get_voluntary_by_id(id):
    with SessionLocal() as session:
        return session.query(Voluntario).filter_by(id=id).first()

def get_voluntary_by_email(email):
    with SessionLocal() as session:
        return session.query(Voluntario).filter_by(email=email).first()

def get_voluntary_by_name(nombre):
    with SessionLocal() as session:
        return session.query(Voluntario).filter_by(nombre=nombre).first()

def create_voluntary(nombre, email, telefono, fecha_registro, comuna_id):   
    with SessionLocal() as session:
        new_voluntary = Voluntario(
            nombre=nombre, email=email, telefono=telefono,
            fecha_registro=fecha_registro, comuna_id=comuna_id
        )
        session.add(new_voluntary)
        session.commit()
        session.refresh(new_voluntary)
        return new_voluntary

def create_register(ruta_archivo, nombre_archivo, avistamiento_id):
    with SessionLocal() as session:
        new_register = Registro(ruta_archivo=ruta_archivo, nombre_archivo=nombre_archivo, avistamiento_id=avistamiento_id)
        session.add(new_register)
        session.commit()

def create_avistamient(voluntario_id, ave_id, fecha_hora, lugar, descripcion):
    with SessionLocal() as session:
        nuevo = Avistamiento(
            voluntario_id=voluntario_id,
            ave_id=ave_id,
            fecha_hora=fecha_hora,
            lugar=lugar,
            descripcion=descripcion
        )
        session.add(nuevo)
        session.commit()
        session.refresh(nuevo) 
        return nuevo

# --- FUNCIONES PARA LA TAREA 3 ---

# -- Para los comentarios --
def create_comentario(nombre, texto, avistamiento_id):
    with SessionLocal() as session:
        nuevo = Comentario(
            nombre=nombre,
            texto=texto,
            fecha=datetime.now(),
            avistamiento_id=avistamiento_id
        )
        session.add(nuevo)
        session.commit()
        session.refresh(nuevo)
        return nuevo.to_dict()

def get_comentarios_by_avistamiento(avistamiento_id):
    with SessionLocal() as session:
        comentarios = session.query(Comentario).filter_by(avistamiento_id=avistamiento_id).order_by(Comentario.fecha.desc()).all()
        return [c.to_dict() for c in comentarios]

# -- Para los gráficos --
def get_stats_avistamientos_por_dia():
    with SessionLocal() as session: ##Grafico de Líneas
        resultados = session.query(
            func.date_format(Avistamiento.fecha_hora, '%Y-%m-%d').label('dia'),
            func.count(Avistamiento.id).label('cantidad')
        ).group_by('dia').order_by('dia').all()

        labels = [r.dia for r in resultados]
        data = [r.cantidad for r in resultados]
        return {"labels": labels, "data": data}

def get_stats_avistamientos_por_tipo():
    with SessionLocal() as session: ##Grafico de Torta
        resultados = session.query(
            Ave.nombre.label('tipo'),
            func.count(Avistamiento.id).label('cantidad')
        ).join(Avistamiento, Avistamiento.ave_id == Ave.id).group_by(Ave.id, Ave.nombre).all()

        labels = [r.tipo for r in resultados]
        data = [r.cantidad for r in resultados]
        return {"labels": labels, "data": data}

def get_stats_voluntarios_por_comuna():
    with SessionLocal() as session: ##Grafico de Barras
        resultados = session.query(
            Comuna.nombre.label('comuna'),
            func.count(Voluntario.id).label('cantidad')
        ).join(Voluntario, Voluntario.comuna_id == Comuna.id).group_by(Comuna.id, Comuna.nombre).order_by(func.count(Voluntario.id).desc()).all()

        labels = [r.comuna.strip() for r in resultados]
        data = [r.cantidad for r in resultados]
        return {"labels": labels, "data": data}