--liquibase formatted sql

--changeset PADMA:6
CREATE TABLE SPLASH_SCREEN (
    ID SERIAL,
    URL VARCHAR(300),
	IMAGE_URL VARCHAR(300),
	FORMAT VARCHAR(100) NOT NULL
);

-- drop table SPLASH_SCREEN;