-- SQLite
-- there should only be one row in this table
-- this deletes existing preferences and creates a new table with the updated preferences.
-- non entered values will default to 1=oz, lb, in
DROP TABLE IF EXISTS preferences;
CREATE TABLE preferences (
liquidUnits INTEGER DEFAULT 1,
weightUnits INTEGER DEFAULT 1,
heightUnits INTEGER DEFAULT 1
);
INSERT INTO preferences (liquidUnits, weightUnits, heightUnits) VALUES (1, 1, 1);