set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "userName" text not null,
  "hashedPassword" text not null,
  "created_at" timestamptz(6) not null default now()
);

CREATE TABLE "weights" (
  "weightId" serial PRIMARY KEY,
  "userId"   int not null,
  "weight" integer,
  "created_at" timestamptz(6) not null default now()
);

ALTER TABLE "weights" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");
