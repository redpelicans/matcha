import geolib from 'geolib';

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
    lookingFor.mySexe = sexe;
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

export const filterBySexeAge = (ctx) => {
  const { globals: { models: { users } }, input: lookingFor } = ctx;
  const { sexe, age } = lookingFor;
  return users.loadBy({ sexe, age }).then((data) => Promise.resolve({ ...ctx, input: { users: data, lookingFor } }));
};

export const cleanUser = (ctx) => {
  const { users, lookingFor } = ctx.input;
  const userClean = users.filter(user => {
    if (user.orientation === 'bisexual') return user;
    if (user.orientation === 'homosexual' && user.sexe === lookingFor.mySexe) return user;
    if (user.orientation === 'heterosexual') {
      if (lookingFor.sexe.includes('men') && user.sexe === 'women') return user;
      if (lookingFor.sexe.includes('women') && user.sexe === 'men') return user;
    }
  });
  return Promise.resolve({ ...ctx, input: { users: userClean, lookingFor } });
};

export const sortGeoLoc = (ctx) => {
  // const { users, lookingFor } = ctx.input;
  // const userClean = users.filter(user => {
  //   if (user.orientation === 'bisexual') return user;
  //   if (user.orientation === 'homosexual' && user.sexe === lookingFor.mySexe) return user;
  //   if (user.orientation === 'heterosexual') {
  //     if (lookingFor.sexe.includes('men') && user.sexe === 'women') return user;
  //     if (lookingFor.sexe.includes('women') && user.sexe === 'men') return user;
  //   }
  // });
  // return userClean;
};
