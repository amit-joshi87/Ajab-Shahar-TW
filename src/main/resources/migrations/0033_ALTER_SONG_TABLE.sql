--liquibase formatted sql

--changeset PADMA:33
ALTER TABLE SONG ADD COLUMN UMBRELLA_TITLE_ID INT REFERENCES UMBRELLA_TITLE(ID);