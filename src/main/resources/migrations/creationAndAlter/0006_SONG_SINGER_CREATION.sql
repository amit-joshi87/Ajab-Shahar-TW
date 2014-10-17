--liquibase formatted sql

--changeset JAIDEEP:3
CREATE TABLE SONG_SINGER (
    ID SERIAL PRIMARY KEY,
    SINGER_ID INT REFERENCES PERSON(ID),
    SONG_ID INT REFERENCES SONG(ID)
);

--rollback drop table SONG;