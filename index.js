const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const contactsService = require("./contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await contactsService.listContacts();
      console.log(contactList);
      break;

    case "get":
      const oneContact = await contactsService.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contactsService.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contactsService.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
