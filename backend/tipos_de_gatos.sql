CREATE TABLE tipos_de_gatos(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    raza VARCHAR(100) NOT NULL,
    personalidad VARCHAR(100)NOT NULL,
    descripcion VARCHAR(2000)NOT NULL,
    procedencia VARCHAR(100),
    datos_curiosos VARCHAR(1000),
    imagen BYTEA NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





