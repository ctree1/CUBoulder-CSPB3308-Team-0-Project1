-- SQLite
CREATE TABLE sleep (
sleepEventID INTEGER PRIMARY KEY AUTOINCREMENT,
eventType TEXT DEFAULT "Sleep" NOT NULL,
babyID INTEGER NOT NULL,
sleepType INTEGER NOT NULL,
sleepDateTime TEXT NOT NULL, -- YYYY-MM-DD HH:MM
sleepComment TEXT,
FOREIGN KEY (babyID)
    REFERENCES babies (babyID),
FOREIGN KEY (eventType)
    REFERENCES sleepType (sleepTypeID)
);