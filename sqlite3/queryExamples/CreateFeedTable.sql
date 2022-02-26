-- SQLite

DROP TABLE IF EXISTS feed;

CREATE TABLE feed (
feedEventID INTEGER PRIMARY KEY AUTOINCREMENT,
eventType TEXT DEFAULT "Feed" NOT NULL,
babyID INTEGER NOT NULL,
leftBreastDur INTEGER,
rightBreastDur INTEGER,
totalBreastDur INTEGER GENERATED ALWAYS AS (leftBreastDur + rightBreastDur) VIRTUAL,
leftPumpQty INTEGER,
rightPumpQty INTEGER,
totalPumpQty INTEGER GENERATED ALWAYS AS (leftPumpQty + rightPumpQty) VIRTUAL,
bottleBreastQty INTEGER,
bottleFormulaQty INTEGER,
totalBottleQty INTEGER GENERATED ALWAYS AS (bottleBreastQty + bottleFormulaQty) VIRTUAL,
feedDateTime TEXT NOT NULL, -- YYYY-MM-DD HH:MM
feedComment TEXT,
FOREIGN KEY (babyID)
    REFERENCES babies (babyID)
);