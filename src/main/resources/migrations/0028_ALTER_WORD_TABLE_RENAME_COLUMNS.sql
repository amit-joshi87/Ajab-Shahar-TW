--liquibase formatted sql

--changeset PADMA:28
ALTER TABLE WORD RENAME COLUMN NAME TO WORD_OR_PHRASE;
ALTER TABLE WORD DROP COLUMN CATEGORY;
ALTER TABLE WORD ADD COLUMN THUMBNAIL_URL VARCHAR(100);
ALTER TABLE WORD ADD COLUMN CATEGORY_ID INT REFERENCES CATEGORY(ID);
