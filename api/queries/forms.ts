import { getDb } from "./connection";
import { appointments, contactMessages } from "@db/schema";

export async function createAppointment(data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}) {
  const db = getDb();
  await db.insert(appointments).values({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    message: data.message || null,
  });
  return { ok: true };
}

export async function createContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const db = getDb();
  await db.insert(contactMessages).values({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    subject: data.subject || null,
    message: data.message,
  });
  return { ok: true };
}
