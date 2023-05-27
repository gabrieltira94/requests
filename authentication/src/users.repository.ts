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

export function isValidUser(username: string, password: string) {
  return UserDB.find(user => user.name === username && user.password === password);
}
