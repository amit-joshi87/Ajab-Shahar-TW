--changeset JAIDEEP:7
CREATE TABLE LANGUAGE (
    ID SERIAL,
    NAME VARCHAR(100) NOT NULL
);
--rollback drop table LANGUAGE;