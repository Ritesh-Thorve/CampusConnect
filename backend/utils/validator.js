import Joi from "joi";

export const validate = (schema, data) => {
  const validation = schema.validate(data, { abortEarly: true });

  if (validation.error) {
    throw new Error(validation.error.details[0].message);
  }
};
