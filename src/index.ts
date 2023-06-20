import { createContact, getContact, init, updateContact } from "./databaseController/databaseService.js";
import { main } from "./main.js";
import express, { Express, NextFunction, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(3000, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:3000`);
  await init();
});

app.post("/contacts", upsertContact);

main().catch((err) => {
  console.error(err);

  process.exit(1);
});

async function upsertContact(req: Request, res: Response, next: NextFunction) {
  const { email, countryCode, languageCode, lastActiveAt } = req.body;

  const existingContact = await getContact(email);

  if (existingContact) {
    await updateContact(email, countryCode, languageCode, lastActiveAt);
    return res.status(201).json({});
  }

  await createContact(email, countryCode, languageCode, lastActiveAt);
  return res.status(204).json({});
}
