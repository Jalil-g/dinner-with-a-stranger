-- Data-only migration: switch from "Same sex"/"Opposite sex" match preferences
-- to explicit genders, and rename gender values Male/Female -> Man/Woman.

UPDATE "Submission" SET "gender" = 'Man' WHERE "gender" = 'Male';
UPDATE "Submission" SET "gender" = 'Woman' WHERE "gender" = 'Female';

-- "Same sex"/"Opposite sex" are well-defined for Man/Woman, so map them directly.
UPDATE "Submission"
SET "matchPreference" = ARRAY(
  SELECT DISTINCT CASE p
    WHEN 'Same sex' THEN "gender"
    WHEN 'Opposite sex' THEN CASE "gender" WHEN 'Man' THEN 'Woman' ELSE 'Man' END
    ELSE p
  END
  FROM unnest("matchPreference") AS p
)
WHERE "gender" IN ('Man', 'Woman')
  AND NOT ('Anyone' = ANY ("matchPreference"));

-- Everyone else (picked "Anyone", or same/opposite is ambiguous for their gender).
UPDATE "Submission"
SET "matchPreference" = ARRAY['Anyone']
WHERE 'Anyone' = ANY ("matchPreference")
   OR 'Same sex' = ANY ("matchPreference")
   OR 'Opposite sex' = ANY ("matchPreference");
