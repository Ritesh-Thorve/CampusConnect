import Joi from 'joi';

export const validate = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: true });

  if (error) {
    // Throw error so it is caught by the errorHandler middleware
    throw new Error(error.details[0].message);
  }
};
