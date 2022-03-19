-- SQLite

DROP TABLE IF EXISTS preferences;

CREATE TABLE preferences (
liquidUnits DECIMAL DEFAULT 1, --1=oz, 2=ml
weightUnits DECIMAL DEFAULT 1, --1=lb, 2=kg
heightUnits INTEGER DEFAULT 1  --1=in, 2=cm
);