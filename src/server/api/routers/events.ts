import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

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
  }),
});
