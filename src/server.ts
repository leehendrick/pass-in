import fastify from "fastify";
import z from "zod";
import { PrismaClient } from '@prisma/client';


const app = fastify();
const prisma = new PrismaClient({
    log: ['query'],
})
app.post('/events', async (request, reply) => {
    const createEventSchema = z.object({
        title: z.string().min(10),
        details: z.string().nullable(),
        maximumAttendeess: z.number().int().positive().nullable(),
    })

    const data = createEventSchema.parse(request.body)

    const event = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            maximumAttendees: data.maximumAttendeess,
            slug: new Date().toISOString()
        }
    })

    return reply.status(201).send({ eventId: event.id })
})



app.listen({ port: 4002 }).then(() => {
    console.log('[-----SERVER RUNNING-----]')
})

//Just testing