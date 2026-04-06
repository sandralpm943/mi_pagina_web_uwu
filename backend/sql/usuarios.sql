CREATE TABLE usuarios_de_gatos(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_rol INTEGER,
    verified BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_rol 
    FOREIGN KEY (id_rol)
    REFERENCES roles(id_rol)
    ON DELETE CASCADE
);

ALTER TABLE usuarios_de_gatos
ADD COLUMN verified BOOLEAN DEFAULT FALSE;
ALTER TABLE usuarios_de_gatos
ADD COLUMN verified_token TEXT;


CREATE TABLE roles_gatos(
    id_rol INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rol_gatos VARCHAR(100) NOT NULL
);



ALTER TABLE usuarios_de_gatos ADD COLUMN id_rol INTEGER;

ALTER TABLE usuarios_de_gatos 
ADD CONSTRAINT fk_rol 
FOREIGN KEY (id_rol)
REFERENCES roles_gatos(id_rol)
ON DELETE CASCADE;

CREATE TABLE permissions (
    id_permission  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE role_permissions (
    id_rol INTEGER,
    id_permission INTEGER,
    PRIMARY KEY (id_rol, id_permission)
);

#Si no se ha llegado a hacer el constraint ejecutar esto:
ALTER TABLE role_permissions
RENAME CONSTRAINT role_permissions_pkey
TO pk_role_permissions;

#para juntar las 2 tablas: id_rol -> id_rol (tabla de roles)
ALTER TABLE role_permissions
ADD CONSTRAINT fk_role_permissions_role
FOREIGN KEY (id_rol)
REFERENCES roles_gatos(id_rol)
ON DELETE CASCADE;

#Para juntar las 2 tablas: id_permission -> id_permission (tabla de permissions)
ALTER TABLE role_permissions
ADD CONSTRAINT fk_role_permissions_permission
FOREIGN KEY (id_permission)
REFERENCES permissions(id_permission)
ON DELETE CASCADE;

TRUNCATE TABLE usuarios_de_gatos RESTART IDENTITY;