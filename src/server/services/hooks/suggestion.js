import geolib from 'geolib';
import pgpConnector from 'pg-promise';

const pgp = pgpConnector({ capSQL: true });

const whichSexe = (sexe, orientation) => {
  if (orientation === 'homosexual') return [sexe];
  if (orientation === 'bisexual') return (['men', 'women']);
  if (sexe === 'men') return (['women']);
  else if (sexe === 'women') return (['men']);
};

const whichAge = (age, range) => ([Number(age) - range, Number(age) + range]);

export const loadProfil = (ctx) => {
  const { globals: { models: { users } }, input: { id } } = ctx;
  const { config: { httpCode: { Unauthorized } } } = ctx.globals;
  console.log('loadProfil'); // eslint-disable-line
  return users.load(id).then(user => {
    if (!user || !user.confirmed) return Promise.reject({ status: Unauthorized });
    const lookingFor = {};
    const { sexe,
      orientation,
      age,
      interest,
      longitude,
      latitude,
      city,
      country,
    } = user;
    lookingFor.sexe = whichSexe(sexe, orientation);
    lookingFor.age = whichAge(age, 10);
    lookingFor.interest = interest;
    lookingFor.userLongitude = longitude;
    lookingFor.userLatitude = latitude;
    lookingFor.country = country;
    lookingFor.city = city;
    return Promise.resolve({ ...ctx, input: lookingFor });
  });
};

export const filterBy = (ctx) => {
  const { globals: { models: { users } }, input: lookingFor } = ctx;
  const { sexe, age } = lookingFor;
  return users.loadBy({ sexe, age }).then((data) => {
    console.log(data);
    return Promise.resolve({ ...ctx });
  })
};
