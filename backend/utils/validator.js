import Joi from 'joi';

/**
 * Validates request body against a Joi schema.
 * Throws an error if validation fails.
 *
 * @param {Joi.ObjectSchema} schema - Joi schema for validation
 * @param {Object} data - Data to validate (usually req.body)
 */

export const validate = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: true });

  if (error) {
    // Throw error so it is caught by the errorHandler middleware
    throw new Error(error.details[0].message);
  }
};
