CREATE TABLE addresses (
	"id" varchar NOT NULL,
	"address" varchar NOT NULL,
	"initCoords" varchar NOT NULL
);

CREATE TABLE building (
	"id" varchar NOT NULL,
	"number" varchar NOT NULL,
    "addressId" varchar NOT NULL,
    "coords" varchar NOT NULL
);


