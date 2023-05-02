import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

import { createId } from "@paralleldrive/cuid2";

import { Resend } from "resend";
import { env } from "@/env.mjs";

import ConfirmRSVP from "@/components/emails/ConfirmRSVP";
const resend = new Resend(env.RESEND_API_KEY);

export const eventsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        location: z.string(),
        slug: z.string(),
        startTime: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.event.create({
        data: {
          name: input.name,
          description: input.description,
          location: input.location,
          slug: input.slug,
          startTime: input.startTime,
          endTime: input.startTime,
          creatorId: ctx.session.user.id,
        },
      });
      return "Success";
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.event.findMany({
      where: {
        creatorId: ctx.session.user.id,
      },
      include: {
        _count: {
          select: { attendees: true },
        },
      },
    });

    console.log(data);

    return data;
  }),

  rsvp: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.prisma.event.findUnique({
        where: {
          slug: input.slug,
        },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      const confirmationCode = createId();

      await ctx.prisma.attendee.create({
        data: {
          name: input.name,
          email: input.email,
          eventId: event.id,
          confirmationCode: confirmationCode,
        },
      });

      const emailData = await resend.sendEmail({
        from: "rsvp@bundl3.tech",
        to: input.email,
        subject: "Confirm your RSVP to " + event.name,
        react: (
          <ConfirmRSVP
            confirmationCode={confirmationCode}
            name={input.name}
            eventName={event.name}
          />
        ),
      });

      return;
    }),
});
