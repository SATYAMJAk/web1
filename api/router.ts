import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { createAppointment, createContactMessage } from "./queries/forms";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),

  appointments: createRouter({
    book: publicQuery
      .input(
        z.object({
          name: z.string().min(2).max(120),
          email: z.string().email().max(190),
          phone: z.string().max(30).optional().default(""),
          message: z.string().max(5000).optional().default(""),
        })
      )
      .mutation(({ input }) => createAppointment(input)),
  }),

  contact: createRouter({
    send: publicQuery
      .input(
        z.object({
          name: z.string().min(2).max(120),
          email: z.string().email().max(190),
          phone: z.string().max(30).optional().default(""),
          subject: z.string().max(255).optional().default(""),
          message: z.string().min(2).max(5000),
        })
      )
      .mutation(({ input }) => createContactMessage(input)),
  }),
});

export type AppRouter = typeof appRouter;
