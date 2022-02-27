-- SQLite

DROP TABLE IF EXISTS babies;

CREATE TABLE babies (
babyID INTEGER PRIMARY KEY AUTOINCREMENT,
eventType TEXT DEFAULT "Baby" NOT NULL,
birthDate TEXT NOT NULL, -- YYYY-MM-DD
firstName TEXT NOT NULL,
lastName TEXT NOT NULL,
abbreviatedName TEXT,
birthWeight INT,
birthHeight INT
);