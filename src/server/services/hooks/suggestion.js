import geolib from 'geolib';
import R from 'ramda';

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
    lookingFor.mySexe = sexe;
    lookingFor.sexe = whichSexe(sexe, orientation);
    lookingFor.age = whichAge(age, 10);
    lookingFor.interest = interest;
    lookingFor.longitude = longitude;
    lookingFor.latitude = latitude;
    lookingFor.country = country;
    lookingFor.city = city;
    return Promise.resolve({ ...ctx, input: lookingFor });
  });
};

export const filterBySexeAge = (ctx) => {
  const { globals: { models: { users } }, input: lookingFor } = ctx;
  const { sexe, age } = lookingFor;
  return users.loadBy({ sexe, age }).then((data) => Promise.resolve({ ...ctx, input: { users: data, lookingFor } }));
};

export const cleanUser = (ctx) => {
  const { users, lookingFor } = ctx.input;
  const userClean = users.filter(user => { // eslint-disable-line
    if (!user.confirmed) return false;
    if (user.orientation === 'bisexual') return true;
    if (user.orientation === 'homosexual' && user.sexe === lookingFor.mySexe) return true;
    if (user.orientation === 'heterosexual') {
      if (lookingFor.sexe.includes('men') && user.sexe === 'women') return true;
      if (lookingFor.sexe.includes('women') && user.sexe === 'men') return true;
    }
  });
  return Promise.resolve({ ...ctx, input: { users: userClean, lookingFor } });
};

export const sortGeoLoc = (ctx) => {
  const { users, lookingFor } = ctx.input;
  const usersSortbyDistance = geolib.orderByDistance(lookingFor, users);
  return Promise.resolve({ ...ctx, input: { ...ctx.input, usersSortbyDistance } });
};

export const reduceUsers = (ctx) => {
  const { usersSortbyDistance } = ctx.input;
  const listUsersSort = R.take(15, usersSortbyDistance);
  const whoShouldStay = listUsersSort.map((value) => Number(value.key));
  return Promise.resolve({ ...ctx, input: { ...ctx.input, whoShouldStay, usersSortbyDistance: listUsersSort } });
};

export const buildUsers = (ctx) => {
  const { usersSortbyDistance, users, whoShouldStay } = ctx.input;
  let index = -1;
  let listUsersSort = users.map(user => { // eslint-disable-line
    index++; // eslint-disable-line
    if (whoShouldStay.includes(index)) {
      let distance = '0';
      usersSortbyDistance.forEach(userSorted => {
        if (Number(userSorted.key) === index) distance = userSorted.distance;
      });
      return { ...user, distance };
    }
  });
  listUsersSort = listUsersSort.filter(user => user);
  return Promise.resolve({ ...ctx, input: { users: listUsersSort } });
};
