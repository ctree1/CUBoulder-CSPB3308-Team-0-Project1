-- SQLite
SELECT * FROM babies WHERE babyID = 1-- get number from UI
-- save birthdate, firstName, lastName etc to variables
-- edit the variable 
UPDATE babies 
SET birthDate = birthdateVariable,
firstName = firstNameVariable,
lastName = lastNameVariable,
abbreviatedName = abbreviatedNameVariable,
birthWeight = birthWeightVariable,
birthHeight = birthHeightVariable,
WHERE babyID = -- same babyID as above from UI