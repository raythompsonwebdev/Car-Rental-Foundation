import mongoose from "mongoose";
import { ContactSchema } from "../models/cr.Model";

const Contact = mongoose.model("Contact", ContactSchema);

//post request to add contact to database.
export const addnewContact = (req, res) => {
    let newContact = new Contact(req.body);
    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

//get request to get all contacts
export const getContact = (req, res) => {
    Contact.find({}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

//get request to get indvidual contact
export const getContactwithID = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

// put request to update contact
export const updateContact = (req, res) => {
    Contact.findOneAndUpdate(
        { _id: req.params.contactId },
        req.body,
        { new: true },
        (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        }
    );
};

// delete request to delete contact
export const deleteContact = (req, res) => {
    Contact.remove({ _id: req.params.contactId }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: "deleted" });
    });
};
