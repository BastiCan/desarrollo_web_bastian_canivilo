from sqlalchemy import create_engine, Column, Integer, BigIteger, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import sessionmaker, declarative_base, relationship

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

class region(Base):
    __tablename__ = 'region'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)


class comuna(Base):
    __tablename__ = 'comuna'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(BigIteger, ForeignKey('region.id'), nullable=False)


class voluntario(Base):
    __tablename__ = 'voluntario'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    email = Column(String(80), nullable=False)
    telefono = Column(String(15), nullable=False)
    fecha_registro = Column(DateTime, nullable=False)
    comuna_id = Column(BigIteger, ForeignKey('comuna.id'), nullable=False)


class ave(Base):
    __tablename__ = 'ave'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)


class avistamiento(Base):
    __tablename__ = 'avistamiento'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    voluntario_id = Column(BigIteger, ForeignKey('voluntario.id'), nullable=False)
    ave_id = Column(BigIteger, ForeignKey('ave.id'), nullable=False)
    fecha_hora = Column(DateTime, nullable=False)
    lugar = Column(String(200), nullable=False)
    descripcion = Column(Text, nullable=True)


class registro(Base):
    __tablename__ = 'registro'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    avistamiento_id = Column(BigIteger, ForeignKey('avistamiento.id'), nullable=False)


# --- Database Functions ---

    
##def get_user_by_id(id):

def creat_register(ruta_archivo, nombre_archivo, avistamiento_id):
    session = SessionLocal()
    new_register = registro(ruta_archivo=ruta_archivo, nombre_archivo=nombre_archivo, avistamiento_id=avistamiento_id)
    session.add(new_register)
    session.commit()
    session.close()
    

def create_avistamient(voluntario_id, ave_id, fecha_hora, lugar, descripcion):
    session = SessionLocal()
    new_avistamient = avistamiento(voluntario_id=voluntario_id, ave_id=ave_id, fecha_hora=fecha_hora, lugar=lugar, descripcion=descripcion)
    session.add(new_avistamient)
    session.commit()
    session.close()



def create_voluntarie(nombre, email, telefono, fecha_registro, comuna_id):   
    session = SessionLocal()
    new_voluntarie = voluntario(nombre=nombre, email=email, telefono=telefono, fecha_registro= fecha_registro, comuna_id = comuna_id)
    session.add(new_voluntarie)
    session.commit()
    session.close()