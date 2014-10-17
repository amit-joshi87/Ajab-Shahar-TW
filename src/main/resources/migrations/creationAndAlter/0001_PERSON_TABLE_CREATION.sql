--liquibase formatted sql

--changeset JAIDEEP:1
CREATE TABLE PERSON (
    ID SERIAL PRIMARY KEY,
    FIRST_NAME VARCHAR(130) NOT NULL,
    MIDDLE_NAME VARCHAR(130),
    LAST_NAME VARCHAR(130),
    CATEGORY varchar(200) NOT NULL
);

--rollback drop table PERSON;