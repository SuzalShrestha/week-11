----------
-- Step 0 - Create a Query 
----------
-- Query: Select all cats that have a toy with an id of 5

    -- Your code here
    SELECT * FROM cat_toys
    JOIN cats ON cat_toys.cat_id = cats.id
    JOIN toys ON cat_toys.toy_id = toys.id
    WHERE toys.id = 5;

-- Paste your results below (as a comment):

-- 4509|4002|5|4002|Rachele|Maroon|Foldex Cat|5|Shiny Mouse|Blue|7
-- 10008|31|5|31|Rodger|Lavender|Oregon Rex|5|Shiny Mouse|Blue|7
-- 10051|77|5|77|Jamal|Orange|Sam Sawet|5|Shiny Mouse|Blue|7


----------
-- Step 1 - Analyze the Query
----------
-- Query:

    -- Your code here

-- Paste your results below (as a comment):
-- QUERY PLAN
-- |--SEARCH toys USING INTEGER PRIMARY KEY (rowid=?)
-- |--SCAN cat_toys
-- `--SEARCH cats USING INTEGER PRIMARY KEY (rowid=?)

-- What do your results mean?

    -- Was this a SEARCH or SCAN?
    -- It was a search for toys and cats primary keys, and a scan for cat_toys.


    -- What does that mean?
    -- It means that the query is searching for the primary keys of toys and cats, and scanning the cat_toys table through iteration.




----------
-- Step 2 - Time the Query to get a baseline
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here
    -- .timer on
    -- SELECT * FROM cat_toys
    -- JOIN cats ON cat_toys.cat_id = cats.id
    -- JOIN toys ON cat_toys.toy_id = toys.id
    -- WHERE toys.id = 5;

-- Paste your results below (as a comment):

-- 4509|4002|5|4002|Rachele|Maroon|Foldex Cat|5|Shiny Mouse|Blue|7
-- 10008|31|5|31|Rodger|Lavender|Oregon Rex|5|Shiny Mouse|Blue|7
-- 10051|77|5|77|Jamal|Orange|Sam Sawet|5|Shiny Mouse|Blue|7
--Run Time: real 0.003 user 0.000000 sys 0.003137



----------
-- Step 3 - Add an index and analyze how the query is executing
----------

-- Create index:

    -- Your code here
    CREATE INDEX idx_cat_toys_toy_id ON cat_toys (toy_id);

-- Analyze Query:
    -- Your code here

-- Paste your results below (as a comment):


-- Analyze Results:

    -- Is the new index being applied in this query?




----------
-- Step 4 - Re-time the query using the new index
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here

-- Paste your results below (as a comment):


-- Analyze Results:
    -- Are you still getting the correct query results?


    -- Did the execution time improve (decrease)?


    -- Do you see any other opportunities for making this query more efficient?


---------------------------------
-- Notes From Further Exploration
---------------------------------