
const dbName = 'booksmaze';
const userName = 'ankitkoundel';
const password = 'anku@1091';
const uri = `mongodb+srv://${userName}:${password}@cluster0-39bpx.mongodb.net/${dbName}?retryWrites=true&w=majority`;


const colUsers = 'users';

module.exports = {uri, dbName, colUsers};