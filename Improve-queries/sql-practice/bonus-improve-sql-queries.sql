----------
-- Step 0 - Create a Query 
----------
-- Query: Find a count of `toys` records that have a price greater than
    -- 55 and belong to a cat that has the color "Olive".

    -- Your code here
    SELECT COUNT(*) FROM cat_toys
    JOIN cats ON cat_toys.cat_id = cats.id
    JOIN toys ON cat_toys.toy_id = toys.id
    WHERE toys.price > 55 AND cats.color = "Olive";

-- Paste your results below (as a comment):
--215



----------
-- Step 1 - Analyze the Query
----------
-- Query:

    -- Your code here
    EXPLAIN QUERY PLAN
    SELECT COUNT(*) FROM cat_toys
    JOIN cats ON cat_toys.cat_id = cats.id
    JOIN toys ON cat_toys.toy_id = toys.id
    WHERE toys.price > 55 AND cats.color = "Olive";

-- Paste your results below (as a comment):
-- QUERY PLAN
-- |--SCAN cat_toys
-- |--SEARCH cats USING INTEGER PRIMARY KEY (rowid=?)
-- `--SEARCH toys USING INTEGER PRIMARY KEY (rowid=?)


-- What do your results mean?

    -- Was this a SEARCH or SCAN?
   -- This was a SCAN for cat_toys and SEARCH for cats and toys using the primary key.

    -- What does that mean?
    -- A SCAN means that the entire table was searched. A SEARCH means that the primary key was used to search the table.s




----------
-- Step 2 - Time the Query to get a baseline
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here
    -- .timer on
    -- SELECT COUNT(*) FROM cat_toys
    -- JOIN cats ON cat_toys.cat_id = cats.id
    -- JOIN toys ON cat_toys.toy_id = toys.id
    -- WHERE toys.price > 55 AND cats.color = "Olive";

-- Paste your results below (as a comment):
-- 215
-- Run Time: real 0.005 user 0.005591 sys 0.000000



----------
-- Step 3 - Add an index and analyze how the query is executing
----------

-- Create index:

    -- Your code here
    CREATE INDEX idx_cats_color ON cats (color);
    CREATE INDEX idx_toys_price ON toys (price);

-- Analyze Query:
    -- Your code here
    EXPLAIN QUERY PLAN
    SELECT COUNT(*) FROM cat_toys
    JOIN cats ON cat_toys.cat_id = cats.id
    JOIN toys ON cat_toys.toy_id = toys.id
    WHERE toys.price > 55 AND cats.color = "Olive";

-- Paste your results below (as a comment):
-- QUERY PLAN
--`--SEARCH cats USING INDEX idx_cats_color (color=?)
-- |--SEARCH toys USING INDEX idx_toys_price (price>?)


-- Analyze Results:

    -- Is the new index being applied in this query?
    -- Yes, the new index is being applied in this query.




----------
-- Step 4 - Re-time the query using the new index
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here
    -- .timer on
    -- SELECT COUNT(*) FROM cat_toys
    -- JOIN cats ON cat_toys.cat_id = cats.id
    -- JOIN toys ON cat_toys.toy_id = toys.id
    -- WHERE toys.price > 55 AND cats.color = "Olive";

-- Paste your results below (as a comment):
-- 215
--Run Time: real 0.015 user 0.014522 sys 0.000000


-- Analyze Results:
    -- Are you still getting the correct query results?
    -- Yes, I am still getting the correct query results.

    -- Did the execution time improve (decrease)?
    -- No, the execution time increased.


    -- Do you see any other opportunities for making this query more efficient?
    -- I do not see any other opportunities for making this query more efficient.



---------------------------------
-- Notes From Further Exploration
---------------------------------
