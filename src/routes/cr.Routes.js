import {
    addNewContact,
    getContacts,
    getContactwithId,
    updateContact,
    deleteContact,
} from "../controllers/crController";

const routes = (app) => {
    app.route("/contact")
        .get((req, res, next) => {
            //middleware
            console.log(`Request from ${req.originalUrl}`);
            console.log(`Request from ${req.method}`);
            next();
        }, getContacts)
        .post(addNewContact);

    app.route("/contact/:contactId")
        //get specific contact
        .get(getContactwithId)
        //this is put request
        .put(updateContact)
        //this is delete request
        .delete(deleteContact);
};

export default routes;
