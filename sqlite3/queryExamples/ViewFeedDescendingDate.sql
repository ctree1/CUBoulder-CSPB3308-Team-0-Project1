-- SQLite

SELECT 
feed.feedEventID,
babies.firstName || " " || babies.lastName as "Baby",
feed.feedDateTime as "Time",
feed.leftBreastDur as "Left Breast, min",
feed.rightBreastDur as "Right Breast, min",
feed.totalBreastDur as "Total Breast, min",
feed.leftPumpQty as "Left Pump Qty",
feed.rightPumpQty as "Right Pump Qty",
feed.totalPumpQty as "Total Pump Qty",
feed.bottleBreastQty as "Bottle Breast Qty",
feed.bottleBreastQty as "Bottle Formulat Qty",
feed.totalBottleQty as "Total Bottle Qty",
feed.feedComment as "Comment" FROM feed
LEFT JOIN babies ON feed.babyID = babies.babyID
ORDER BY feedDateTime DESC
LIMIT 5