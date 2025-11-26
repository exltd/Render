const fastify = require('fastify')({
    logger: true
});
const path = require('path');
const fs = require('fs').promises;

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/'
});

fastify.get('/', async (request, reply) => {
    try {
        const html = await fs.readFile(path.join(__dirname, 'index.html'), 'utf8');
        reply.type('text/html');
        return html;
    } catch (error) {
        reply.type('text/html');
        return '<p>HTML file not found</p>';
    }
});

const start = async () => {
  try {
    await fastify.listen({ 
      port: process.env.PORT || 3000, 
      host: '0.0.0.0' 
    })
    console.log(`Server is running on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();