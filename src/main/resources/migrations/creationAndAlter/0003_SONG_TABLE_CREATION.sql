--liquibase formatted sql

--changeset JAIDEEP:3
CREATE TABLE SONG (
    ID SERIAL PRIMARY KEY,
    TITLE_ID INT REFERENCES TITLE(ID),
    SINGER_ID INT REFERENCES PERSON(ID),
    POET_ID INT REFERENCES PERSON(ID),
    SHOW_ON_LANDING_PAGE BOOLEAN,
    CATEGORY VARCHAR(200) NOT NULL,
    DURATION VARCHAR(200)
);

-- drop table SONG;