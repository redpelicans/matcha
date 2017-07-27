const getToken = async (ctx, next) => {
  const { request: { body: rBody }, req: { body } } = ctx;
  let matchaToken = ctx.query.matchaToken;
  if (!matchaToken && rBody) matchaToken = rBody;
  if (!matchaToken && body) matchaToken = body;
  ctx.matchaToken = matchaToken;
  await next();
};

export default getToken;
