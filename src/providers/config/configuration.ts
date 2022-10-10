import path from 'path';
import fs from 'fs';

import { Config } from '@providers/config/config.interface';
import Joi from 'joi';

const validate = (config: Config): void => {
  const schema = Joi.object().keys({
    app: Joi.object().keys({
      port: Joi.number().required(),
    }),
    database: Joi.object().keys({
      name: Joi.string().required(),
    }),
  });

  const { error } = schema.validate(config);

  if (error) {
    throw new Error(`config validate failed, message: ${error.message}`);
  }
};

export const configuration = async (): Promise<Config> => {
  const fileName = process.env.NODE_ENV || 'development';
  const filePath = path.resolve(process.cwd(), `config/${fileName}.ts`);
  const exists = await fs.existsSync(filePath);

  if (!exists) {
    throw new Error(`Missing ${fileName} env file`);
  }

  const { config }: { config: Config } = await import(
    `../../../config/${fileName}`
  );

  validate(config);

  return config;
};
