const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

//Tao moi va luu lien he 
exports.create = async (req, res, next) => {
    if(!req.body?.name){
        return next(
            new ApiError(400, "Name can not be empty")
        );
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);

        return res.send(document);
    } catch (error) {
        next(
            new ApiError(500, "An error occured while create the contact")
        );
    }
};

//tim kiem tat ca lien he cua nguoi dung
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;

        if(name){
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving contacts")
        );
    }

    return res.send(documents);
};

//tim contact theo id
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findByID(req.params.id);

        if(!document){
            return next(
             new ApiError(404, "Contact not found")
            );
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving contact with id = ${req.params.id}`)
        );
    }
};

//update contact theo id của request
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(
            new ApiError(400, "Data to update cannot be empty")
        );
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = contactService.update(req.params.id, req.body);
        if(!document){
            return next(
                new ApiError(404, "Contact not found")
            );
        }

        return res.send({message : "Contact updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id ${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = contactService.delete(req.params.id);

        if(!document){
            return next(
                new ApiError(404, "Contact not found, can not delete!")
            );
        }

        return res.send({message: "Contact was delete successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Can't delete contact with id ${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const countDeleted = await contactService.deleteAll();
        return res.send({message : `${countDeleted} contact was deleted from contact book`});
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while deleting all contact")
        );
    }
};

exports.findAllFavorite =  async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving favorite contacts")
        );
    }
};




