const getToken = async (ctx, next) => {
  const { request: { body: rBody }, req: { body } } = ctx;
  let matchaToken = ctx.query.matchaToken;
  if (!matchaToken && rBody && rBody.matchaToken) matchaToken = rBody.matchaToken;
  if (!matchaToken && body && body.matchaToken) matchaToken = body.matchaToken;
  ctx.matchaToken = matchaToken || '';
  await next();
};

export default getToken;
