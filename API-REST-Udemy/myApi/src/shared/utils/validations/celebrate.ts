import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

export function validCelebrate(route: string): RequestHandler {
  if (route === 'criar') {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
      }),
    });
  };

  if (route === 'listar') {
    return celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
        limit: Joi.number(),
      }),
    });
  }

  if (route === 'listarId') {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required(),
      }),
    });
  }

  if (route === 'atualizar') {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
      }),
    });
  }

  if (route === 'deletar') {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required(),
      }),
    });
  }
};
