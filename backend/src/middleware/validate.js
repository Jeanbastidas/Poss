export function validate(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({
        message: 'Validación fallida',
        errors: parsed.error.flatten()
      });
    }

    req.body = parsed.data;
    return next();
  };
}
