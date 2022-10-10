import { format } from 'date-fns';
import type { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

const callback: FastifyPluginCallback = (fastify, options, next) => {
  fastify.get('/ping', options, (request, reply) => {
    const now = new Date();
    const formatedTime = format(now, 'yy년 MM월 dd일 HH시 mm분 ss초');
    reply.send(formatedTime);
  });

  next();
};

export const ping = fp(callback, { name: 'ping', fastify: '4.x' });
