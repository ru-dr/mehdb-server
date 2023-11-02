const bcrypt = require('bcrypt');

const saltRounds = 10;

// Hashing a password
const plainPassword = 'mySecretPassword';
const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

// Comparing a password
const enteredPassword = 'enteredPassword';
const isMatch = bcrypt.compareSync(enteredPassword, hashedPassword);

console.log('Entered Password:', enteredPassword);
console.log('Stored Hashed Password:', hashedPassword);
console.log('Password Match:', isMatch);
