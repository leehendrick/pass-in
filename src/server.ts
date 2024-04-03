import fastify from "fastify";
import { serializerCompiler, validatorCompiler,  } from 'fastify-type-provider-zod';
import {createEvent} from "./routes/create-event";


const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);

app.listen({ port: 4002 }).then(() => {
    console.log('[-----SERVER RUNNING-----]')
})

//Just testing