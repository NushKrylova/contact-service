import pg from "pg";

export const connection = new pg.Pool({ connectionString: "postgres://postgres:postgres@localhost:5432/postgres" });
