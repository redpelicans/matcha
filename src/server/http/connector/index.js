const getVerb = (req) => req.method.toLowerCase();
const getService = (req) => {
  const re = new RegExp(/^\/+(\w+)/); // assing id or no assign
  const [,service] = re.exec(req.url); //eslint-disable-line
  return service;
};
const getInput = (req) => Object.assign(req.query, req.body);
const getMessage = (req) => {
  const [service, method, input] = [getService(req), getVerb(req), getInput(req)];
  console.log(service, method, input);
  return { service, method, input };
};

const connector = (evtx) => (req, res, next) => {
  evtx
    .run(getMessage(req))
    .then(data => {
      res.json(data);
    })
    .catch(next);
};

export default connector;
