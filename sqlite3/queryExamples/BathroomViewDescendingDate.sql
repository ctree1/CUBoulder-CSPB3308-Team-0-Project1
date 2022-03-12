-- SQLite
-- Combines the baby name (From babies) with bathroom time (from bathroom) and BathroomTypeName (From bathroomType)
SELECT 
bathroom.bathroomEventID,
babies.firstName || " " || babies.lastName as "Baby",
bathroom.bathroomDateTime as "Time",
bathroomType.bathroomTypeName as "Type",
bathroom.bathroomComment as "Comment" FROM bathroom
LEFT JOIN babies ON bathroom.babyID = babies.babyID
LEFT JOIN bathroomType ON bathroom.bathroomType = bathroomType.bathroomTypeID
ORDER BY bathroomDateTime DESC
LIMIT 3