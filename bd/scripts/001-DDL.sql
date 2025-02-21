CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    passaporte VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    setor_principal INT NOT NULL,
    data_admissao DATE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_setor_principal FOREIGN KEY (setor_principal) REFERENCES setor(id)
);

CREATE TABLE setor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuario_setor_secundario (
    usuario_id INT NOT NULL,
    setor_id INT NOT NULL,
    PRIMARY KEY (usuario_id, setor_id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_setor_secundario FOREIGN KEY (setor_id) REFERENCES setor(id)
);
