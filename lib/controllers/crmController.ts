import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController{
  public addNewContact(req: Request, res: Response): void {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
      if(err){
        res.send(err);
      }
      res.json(contact);
    });
  }

  public getContacts(req: Request, res: Response): void {
    Contact.find({}, (err, contact) => {
      err ? res.send(err) : res.json(contact);
    });
  }

  public getContactWithID(req: Request, res: Response): void {
    Contact.findById(req.params.contactId, (err, contact) => {
      err ? res.send(err) : res.json(contact);
    });
  }

  public updateContact(req: Request, res: Response) {           
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
      err ? res.send(err) : res.json(contact);
    });
  }

  public deleteContact(req: Request, res: Response) {           
    Contact.deleteOne({ _id: req.params.contactId }, (err) => {
      err ? res.send(err) : res.json({ message: 'Successfully deleted contact!'});
    });
  }
}