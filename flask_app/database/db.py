from sqlalchemy import create_engine, Column, Integer, BigIteger, String, ForeignKey
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
    __tablename__ = 'regiones'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)


class comuna(Base):
    __tablename__ = 'comunas'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(BigIteger, ForeignKey('region.id'), nullable=False)


class voluntario(Base):
    __tablename__ = 'voluntarios'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    email = Column(String(80), nullable=False)
    telefono = Column(String(15), nullable=False)
    fecha_registro = Column(   , nullable=Flase)
    comuna_Id = Column(BigIteger, ForeignKey('comuna.id'), nullable=False)


class ave(Base):
    __tablename__ = 'aves'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)


class avistamiento(Base):
    __tablename__ = 'avistamientos'

    id = Column(BigIteger, primary_key=True, autoincrement=True)
    voluntario_id = Column(BigIteger, ForeignKey('voluntario.id'), nullable=False)
    ave_id = Column(BigIteger, ForeignKey('ave.id'), nullable=False)
    fecha_hora = Column('DATETIME', nullable=False)
    lugar = Column(String(200), nullable=False)
    descripcion = Column('TEXTO(500)', nullable=True)


class registro(Base):
    __tablename__ = 'registros'

    id = Column(BigIteger, primary_key=True, nullable=False)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    avistamiento_id = Column(BigIteger, ForeignKey('avistamiento.id'), nullable=False)

    