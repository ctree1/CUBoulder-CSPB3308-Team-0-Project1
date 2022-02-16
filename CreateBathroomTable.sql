-- SQLite
CREATE TABLE bathroom (
bathroomEventID INTEGER PRIMARY KEY AUTOINCREMENT,
babyID INTEGER NOT NULL,
bathroomType TEXT NOT NULL,
bathroomDateTime TEXT NOT NULL, -- YYYY-MM-DD HH:MM
bathroomComment TEXT,
FOREIGN KEY (babyID)
    REFERENCES babies (babyID)
);