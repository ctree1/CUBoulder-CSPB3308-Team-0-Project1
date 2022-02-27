-- SQLite

DROP TABLE IF EXISTS preferences;

CREATE TABLE preferences (
liquidUnits INTEGER DEFAULT 1,
weightUnits INTEGER DEFAULT 1,
heightUnits INTEGER DEFAULT 1
);