-- to start DB: run following code
-- eliminate any existing tables
DROP TABLE todolist;

-- initialize table
CREATE TABLE todolist (
    "id" serial PRIMARY KEY,
    "taskname" varchar(60),
    "taskdesc" varchar(256),
    "complete" boolean DEFAULT false NOT NULL 
)

-- insert default values
INSERT INTO "todolist" ("taskname", "taskdesc", "complete")
	VALUES ('Wash Dishes', 'load and start dishwasher, clean off cutting board', false), 
    ('Do laundry', 'load and start laundry machine', false), 
    ('Leaves', 'Rake leaves into a big pile', false), 
    ('Leaves pt. 2', 'Jump into pile of leaves', false),
    ('Snow', 'Shovel snow onto Duanes driveway', false),
    ('Pick up dogs', 'go to the vet, pick up roxanne and margaret, make a nuisance of yourself with a very long text entry.', false)
    ;