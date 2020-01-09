CREATE TABLE folders (
	"id" varchar NOT NULL,
	"name" varchar NOT NULL
);

CREATE TABLE notes (
	"id" varchar NOT NULL,
	"name" varchar NOT NULL,
    "modified" varchar NOT NULL,
    "folderId" varchar NOT NULL,
    "content" varchar NOT NULL
);

insert into folders (id, name)
values 
('b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1', 'Important'),
('b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1', 'Super'),
('b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1', 'Spangley')
