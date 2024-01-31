-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "users" ("userName", "password")
values ('tester1', 'test123');

insert into "weights" ("userId", "weight", "created_at")
values (1, 160, '1/29/2024'),
        (1, 160, '1/30/2024'),
        (1, 159, '1/31/2024');
