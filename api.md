## API - MATCHA

This api is the back end of a project school called Matcha.
Techno

### Installing

```
yarn install
```

### Running the tests
 
```
yarn srv:test // Server side
yarn client:test // Client side
```
For coverage
```
yarn coverage
```

## Launch Api

Develop mode:
```
yarn build:dev // client side
yarn srv:dev // server side
```
Production mode:
```
yarn build:prod // client
yarn srv:production // server
```

## Endpoint

### Redux type action

#### Service Users
| Action | Type    | Payload    | ReplyTo  | Response |
|:---------:| ------------- |:-------------:| :-----:|:-----:|
| load info of user | users:get | `{ id: Userid }` | getUser | `users omit password` |
| load users by filter | users:filter | `{ sexe: male ... }` | usersFiltered | `array of users` |
| Register a new user | users:post | `{ login, email, password, firstname, lastname, sexe, age}` | post | `users` |
| Update an user | users:put    | `{ email: 'newemail@gmail.com' ... }` | put | `users updated` |
| Log user in | users:login    | `{ login, password }` | login | `matchaToken` |
| Delete user | users:delete    | `{  }` | deleted | `userDeleted` |
| show profil who apt to interest an user provided  | users:suggestion    | `{ users }` | suggestion | Array User sorted by geoloc |


#### Service Likes
| Action | Type    | Payload    | ReplyTo  | Response |
|:---------:| ------------- |:-------------:| :-----:|:-----:|
| add a like| like:addLike | `{ from: likerUser.id, to: likedUser.id }` | addlike | `{ id, from , to, date, push }` |
| remove a like| like:unLike| `{ from: likerUser.id, to: likedUser.id }` | unlike | `{ id, from , to, date, push }` |

#### Service admin
| Action | Type    | Payload    | ReplyTo  | Response |
|:---------:| ------------- |:-------------:| :-----:|:-----:|
| ping server | admin:ping | `pong` | pong | `pong` |
| status of server | admin:get    | { } | getStatus | `{  config, ... }` |
