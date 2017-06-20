const getVerb = (req) => req.method.toLowerCase();

const getInput = (req, id) => Object.assign(req.query, req.body, id && { id });

const getMessage = (req) => {
  const re = new RegExp(/^\/+(\w+)\/?(\d?)/);
  const [, service, id] = re.exec(req.url); //eslint-disable-line
  const [method, input] = [getVerb(req), getInput(req, id)];
  console.log(`Service ${service}, Method ${method}, Input`);
  console.log(input);
  return { service, method, input };
};

const connector = (evtx) => (req, res, next) => {
  evtx
    .run(getMessage(req), { req })
    .then(data => res.json(data))
    .catch((err) => next(err));
};

export default connector;
