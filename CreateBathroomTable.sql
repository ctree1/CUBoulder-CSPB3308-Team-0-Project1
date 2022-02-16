-- SQLite
CREATE TABLE bathroom (
bathroomEventID INTEGER PRIMARY KEY AUTOINCREMENT,
babyID INTEGER NOT NULL,
BathroomType TEXT NOT NULL,
BathroomTime TEXT NOT NULL,
BathroomComment TEXT,
FOREIGN KEY (babyID)
    REFERENCES babies (babyID)
);