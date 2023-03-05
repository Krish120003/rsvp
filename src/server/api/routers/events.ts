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
        await ctx.prisma.event.create(
            {
                data: {
                    name: input.name,
                    description: input.description,
                    location: input.location,
                    slug: input.slug,
                    startTime: input.startTime,
                    creatorId: ctx.session.user.id
                }
            }
        );

      return "Success"
    }),

    get: publicProcedure.input(z.string()).query(async ({input: slug, ctx}) => {
        return await ctx.prisma.event.findUniqueOrThrow({
            where: {
                slug: slug
            }
        })
    })





    
});
