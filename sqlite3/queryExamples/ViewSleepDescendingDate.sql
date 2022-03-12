-- SQLite

SELECT 
sleep.sleepEventID,
babies.firstName || " " || babies.lastName as "Baby",
sleep.sleepDateTime as "Time",
sleepType.sleepTypeName as "Type",
sleep.sleepComment as "Comment",
round(24 * (JULIANDAY(sleep.sleepDateTime) - LAG(JULIANDAY(sleep.sleepDateTime)) OVER (ORDER BY sleep.sleepDateTime)),1) AS "Previous Duration, hrs"
FROM sleep
LEFT JOIN babies ON sleep.babyID = babies.babyID
LEFT JOIN sleepType ON sleep.sleepType = sleepType.sleepTypeID
WHERE sleep.babyID = 2 -- replace with recent baby
ORDER BY sleep.sleepDateTime DESC
LIMIT 3
