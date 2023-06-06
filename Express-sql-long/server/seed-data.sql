-- BASIC PHASE 1A - DROP and CREATE table
-- Your code here
DROP TABLE IF EXISTS trees;
CREATE TABLE trees(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(32),
    location VARCHAR(64),
    height_ft INTEGER,
    ground_circumference_ft INTEGER
);


-- BASIC PHASE 1B - INSERT seed data
-- Your code here
INSERT INTO trees (name, location, height_ft, ground_circumference_ft)
VALUES ('General Sherman','Sequoia National Park',274.9,102.6),
('General Grant','Kings Canyon National Park',268.1,107.5),
('President','Sequoia National Park',240.9,93.0),
('Lincoln','Sequoia National Park',255.8,98.3),
('Stagg','Private Land',243.0,109.0),
('Boole','Private Land',268.0,112.0),
('Genesis','Sequoia National Park',252.0,94.0),
('Franklin','Giant Sequoia National Monument',242.0,78.0),
('King Arthur','Giant Sequoia National Monument',270.0,90.0),
('El Viejo Del Norte','Giant Sequoia National Monument',267.0,90.0),
('El Gobernador','Giant Sequoia National Monument',268.0,90.0),
('El Presidente','Giant Sequoia National Monument',250.0,90.0),
('El Monarca','Giant Sequoia National Monument',247.0,90.0),
('Hume','Sequoia National Park',254.0,78.0),
('Waterfall','Sequoia National Park',247.0,90.0),
('Ash Mountain','Sequoia National Park',242.0,93.0),
('Hart','Sequoia National Park',258.0,90.0),
('Hazelwood','Sequoia National Park',253.0,90.0),
('Muir','Sequoia National Park',269.0,90.0),
('Helen','Sequoia National Park',249.0,90.0),
('Cleveland','Sequoia National Park',267.0,90.0),
('Columbus','Sequoia National Park',249.0,90.0),
('Roosevelt','Sequoia National Park',247.0,90.0),
('Kennedy','Sequoia National Park',254.0,90.0),
('Washington','Sequoia National Park',255.0,90.0),
('Jefferson','Sequoia National Park',250.0,90.0),
('Madison','Sequoia National Park',247.0,90.0),
('Adams','Sequoia National Park',247.0,90.0),
('Monroe','Sequoia National Park',247.0,90.0),
('Van Buren','Sequoia National Park',247.0,90.0),
('Harrison','Sequoia National Park',247.0,90.0),
('Tyler','Sequoia National Park',247.1,98.0);