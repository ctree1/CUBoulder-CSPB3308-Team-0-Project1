-- SQLite
CREATE TABLE bathroom (
bathroomEventID INTEGER PRIMARY KEY AUTOINCREMENT,
eventType TEXT DEFAULT "Bathroom" NOT NULL,
babyID INTEGER NOT NULL,
bathroomType INTEGER NOT NULL,
bathroomDateTime TEXT NOT NULL, -- YYYY-MM-DD HH:MM
bathroomComment TEXT,
FOREIGN KEY (babyID)
    REFERENCES babies (babyID),
FOREIGN KEY (BathroomType)
    REFERENCES bathroomType (bathroomTypeID)
);