const contacts = require('./contacts');

async function invokeAction(argv) {
  switch (argv.action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    // ... reszta przypadków
  }
}

module.exports = invokeAction;