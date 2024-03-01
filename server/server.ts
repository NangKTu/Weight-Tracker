/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
  authMiddleware,
} from './lib/index.js';

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};
type Auth = {
  username: string;
  password: string;
};

type Entry = {
  weightId: number;
  weight: number;
};

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// api request to get which dates user checked in
app.get('/api/user/checkins', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      SELECT "created_at" FROM "weights" WHERE "userId" = $1 ORDER BY "created_at" DESC;
    `;
    const result = await db.query<User>(sql, [req.user?.userId]);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// api request to get weights and dates as data for graph
app.get('/api/user-weights', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      SELECT "weight", "created_at" FROM "weights" WHERE "userId" = $1 ORDER BY "created_at" ASC;
    `;
    const result = await db.query(sql, [req.user?.userId]);

    const weightsData = result.rows.map((row) => ({
      weight: row.weight,
      created_at: row.created_at,
    }));

    res.status(200).json(weightsData);
  } catch (err) {
    next(err);
  }
});

// app async functionn use to input new weight number into databse
app.post('/api/user-weight', authMiddleware, async (req, res, next) => {
  try {
    const { weight } = req.body;
    if (!weight) {
      return res.status(400).json({ error: 'Weight is required.' });
    }
    const sql = `
      INSERT INTO "weights" ("userId", "weight")
      VALUES ($1, $2)
      RETURNING *
    `;
    const params = [req.user?.userId, weight];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// function use to make new user in database
app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("userName", "hashedPassword")
      values ($1, $2)
      returning *
    `;
    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// authenticate and give user token when login
app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "userName" = $1
  `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

// api request for guest
app.post('/api/auth/sign-in-guest', async (req, res, next) => {
  try {
    const guestUsername = 'guest';
    const guestPassword = 'dummy123'; // Predefined password for guest users
    const sql = `
      SELECT "userId", "hashedPassword"
      FROM "users"
      WHERE "userName" = $1
    `;
    const params = [guestUsername];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'Guest user not found');
    }
    // Verify the predefined password against the hashed password in the database
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, guestPassword))) {
      throw new ClientError(401, 'Invalid guest password');
    }
    const payload = { userId, username: guestUsername };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
