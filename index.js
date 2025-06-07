const express = require('express');
const contacts = require('./contacts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Endpointy API
app.get('/contacts', async (req, res) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await contacts.getContactById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dodaj pozostałe endpointy (POST, DELETE) według potrzeb

// Uruchom serwer
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Zachowaj funkcjonalność CLI dla lokalnego rozwoju
if (process.env.NODE_ENV === 'development') {
  const { Command } = require('commander');
  const program = new Command();
  
  program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

  program.parse(process.argv);
  const argv = program.opts();

  if (argv.action) {
    require('./cli')(argv); // Przenieś logikę CLI do osobnego pliku
  }
}