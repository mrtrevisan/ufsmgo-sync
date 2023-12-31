--postgresql
/*
CREATE TABLE evento (
    id INTEGER PRIMARY KEY,
    data_inicio DATE,
    data_termino DATE,
    local VARCHAR(255),
    centro VARCHAR(5),
    nome VARCHAR(255),
    link VARCHAR(255)
);

CREATE TABLE centro (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    sigla VARCHAR(10),
    longitude FLOAT,
    latitude FLOAT
);

INSERT INTO centro (nome, sigla, latitude, longitude)
VALUES ('Centro de Tecnologia', 'CT', -29.713190291317783, -53.71682910622894),
       ('Centro de Ciêcnias da Saude', 'CCS', -29.71357791320489, -53.71387518235088),
       ('Centro de Ciências Naturais e Exatas', 'CCNE', -29.71448879726987, -53.716452165560874),
       ('Centro de Artes e Letras', 'CAL', -29.718505197133915, -53.71581290533199),
       ('Centro de Ciências Sociais e Humanas', 'CCSH', -29.72061309679607, -53.71865958633839),
       ('Centro de Ciências Rurais', 'CCR', -29.7184521203052, -53.71677597449196),
       ('Centro de Educação', 'CE', -29.714884683637273, -53.71807585041829),
       ('Centro de Educação Física e Desportos', 'CEFD', -29.719797995887717, -53.71041164514275),
       ('Colégio Politécnico', 'POLI', -29.722189325079345, -53.71793839904378),
       ('Colégio Técnico Industrial de Santa Maria', 'CTISM', -29.71121379030947, -53.717138986219815),
       ('Unidade de Educação Infantil Ipê Amarelo', 'IPE', -29.711742361807893, -53.71752996467574),
       ('Centro de Convenções', 'CC', -29.722465372810927, -53.71696534053394),
       ('Pró-Reitoria de Assuntos Estudantis', 'PRAE', -29.72052460727689, -53.71227043564285),
       ('Reitoria', 'REITORIA', -29.72089184647684, -53.71473743206669),
       ('Pró-Reitoria de Graduação', 'PROGRAD', -29.720834775355176, -53.71227194511495),
       ('Pró-Reitoria de Inovação e Empreendedorismo', 'PROINOVA', -29.722724680595896, -53.711214156218645),
       ('Biblioteca Central', 'BC', -29.71565916729169, -53.715241911176925),
       ('Centro de Processamento de Dados', 'CPD', -29.720861910594707, -53.71383139686621);
*/