-- SQLite
--SELECT * FROM babies;
--SELECT * FROM bathroom ORDER BY bathroomDateTime DESC;
--SELECT * FROM sleep;
--SELECT * FROM babies;
SELECT * FROM preferences;
--SELECT * FROM bathroomType;
--SELECT * FROM sleepType;
--SELECT * FROM feed;
--INSERT INTO sleepType (sleepTypeName) VALUES ("Asleep");
--INSERT INTO babies (birthDate, firstName, lastName) VALUES (2022-02-24, "Joe", "Baby");
--ALTER TABLE sleepType RENAME COLUMN sleepEventName TO sleepTypeName;
--DROP TABLE bathroom;
--PRAGMA foreign_keys = ON; --enforce foreign keys
--PRAGMA foreign_keys; --check foreign key setting
/*SELECT babies.firstName, babies.lastName, bathroom.eventType, bathroom.bathroomDateTime, bathroom.bathroomType FROM bathroom
LEFT JOIN babies ON bathroom.babyID = babies.babyID
ORDER BY bathroomDateTime DESC
LIMIT 1*/
--SELECT babyID FROM bathroom ORDER BY babyID DESC LIMIT 1;
--UPDATE bathroom SET bathroomDateTime = REPLACE(bathroomDateTime, " ", "T");