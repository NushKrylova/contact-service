import { connection } from "./dbConnection.js";

export async function init() {
  const client = await connection.connect();
  await client.query(`CREATE TABLE if not exists contacts(
                        id serial PRIMARY KEY,
                        email VARCHAR (255) UNIQUE NOT null,
                        country_code VARCHAR (2) NOT null,
                        language_code VARCHAR (2) NOT null,
                        last_active_at TIMESTAMP,
                        created_at TIMESTAMP default now()
                    )`);
}

export async function createContact(
  email: string,
  countryCode: string,
  languageCode: string,
  lastActiveAt: Date,
  createdAt = new Date()
) {
  const client = await connection.connect();
  const query = {
    text: `INSERT INTO public.contacts (email, country_code, language_code, last_active_at, created_at) VALUES($1, $2, $3, $4, $5);`,
    values: [email, countryCode, languageCode, lastActiveAt, createdAt],
  };
  await client.query(query);
}

export async function getContact(email: string) {
  const client = await connection.connect();
  const query = {
    text: `select * from contacts where email = $1`,
    values: [email],
  };
  const results = await client.query(query);
  console.log(results.rows);
  return results.rows[0];
}

export async function updateContact(email: string, countryCode: string, languageCode: string, lastActiveAt: Date) {
  const client = await connection.connect();
  const query = {
    text: `UPDATE contacts SET country_code=$1, language_code=$2, last_active_at=$3 where email=$4`,
    values: [countryCode, languageCode, lastActiveAt, email],
  };
  await client.query(query);
}
