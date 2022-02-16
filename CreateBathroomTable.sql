-- SQLite
CREATE TABLE bathroom (
bathroomEventID INTEGER PRIMARY KEY AUTOINCREMENT,
babyID INTEGER NOT NULL,
bathroomType TEXT NOT NULL,
bathroomTime TEXT NOT NULL,
bathroomComment TEXT,
FOREIGN KEY (babyID)
    REFERENCES babies (babyID)
);