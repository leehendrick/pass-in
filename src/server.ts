import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import {serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider} from 'fastify-type-provider-zod';
import {createEvent} from "./routes/create-event";
import {registerForEvent} from "./routes/register-for-event";
import {getEvent} from "./routes/get-event";
import {getAttendeeBadge} from "./routes/get-attendee-badge";
import {checkIn} from "./routes/check-in";
import {getEventAttendees} from "./routes/get-event-attendees";
import exp from "node:constants";

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass.in',
            description: 'Especificação da API para o back-end da aplicação pass.in construída durante a NLW Unite da Rocketseat.',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
})
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

app.listen({ port: 4002, host: '0.0.0.0' }).then(() => {
    console.log('[-----SERVER RUNNING-----]')
})

//Just testing