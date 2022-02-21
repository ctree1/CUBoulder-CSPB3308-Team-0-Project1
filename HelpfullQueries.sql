-- SQLite
--SELECT * FROM bathroom;
--INSERT INTO sleepType (sleepTypeName) VALUES ("Asleep");
--ALTER TABLE sleepType RENAME COLUMN sleepEventName TO sleepTypeName;
--DROP TABLE bathroom;
SELECT babies.firstName, babies.lastName, bathroom.eventType, bathroom.bathroomDateTime, bathroom.bathroomType FROM bathroom
LEFT JOIN babies ON bathroom.babyID = babies.babyID
ORDER BY bathroomDateTime