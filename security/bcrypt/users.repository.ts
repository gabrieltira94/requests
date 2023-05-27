// Users database
const UserDB = [
  {
    id: 1,
    name: 'Alex',
    password: 'strongOne',
    hasAccess: false
  },
  {
    id: 2,
    name: 'Cami',
    password: 'strongTwo',
    hasAccess: true
  },
  {
    id: 3,
    name: 'Heil',
    password: 'amazingPass',
    hasAccess: true
  }
];

export function hasAccess(userId: number) {
  return UserDB.find(user => user.id === userId)?.hasAccess;
}


export function isValidUser(username: string) {
  return UserDB.find(user => user.name === username);
}

export function isNameTaken(username: string) {
  return UserDB.find(user => user.name === username);
}

export function addUser(name: string, password: string) {
  const lastId = UserDB[UserDB.length - 1].id;
  const id = lastId + 1;
  const hasAccess = false;
  const newUser = { id, name, password, hasAccess };

  UserDB.push(newUser);

  return newUser;
}
