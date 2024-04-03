import fastify from "fastify";

const app = fastify();

app.get('/', () => {
    return 'Hello NLW Unite'
})

app.listen({ port: 4002 }).then(() => {
    console.log('[-----SERVER RUNNING-----]')
})