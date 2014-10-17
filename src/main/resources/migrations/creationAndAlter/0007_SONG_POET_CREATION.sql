--liquibase formatted sql

--changeset JAIDEEP:3
CREATE TABLE SONG_POET (
    ID SERIAL PRIMARY KEY,
    POET_ID INT REFERENCES PERSON(ID),
    SONG_ID INT REFERENCES SONG(ID)
);

--rollback drop table SONG;