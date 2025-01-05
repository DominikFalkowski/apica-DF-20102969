const defaultErrHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }

  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack}`);
};

export default defaultErrHandler;