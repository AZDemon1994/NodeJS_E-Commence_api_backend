const DB = require("../models/permit");
const Helper = require("../utils/helper");


const all = async (req, res, next) => {
    let permits = await DB.find().select("-__v");
    Helper.fMsg(res, "Get All Permit", permits);
}
const add = async (req, res, next) => {
    let dbPermit = await DB.findOne({ name: req.body.name });
    if (dbPermit) {
        next(new Error("This permit name is already use!"));
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, "Add Permit Success!", result);
    }
}
const get = async (req, res, next) => {
    let permit = await DB.findOne({ id: req.params.id });
    if (permit) {
        let result = await DB.findById(permit._id).select("-__v");
        Helper.fMsg(res, "Get Single Permit!", result);
    } else {
        next(new Error("There is no permit with this ID!"));
    }
}
const patch = async (req, res, next) => {
    let permit = await DB.findOne({ id: req.params.id });
    if (permit) {
        await DB.findByIdAndUpdate(permit._id, req.body);
        let result = await DB.findById(permit._id);
        Helper.fMsg(res, "Edit Permit Success!", result);
    } else {
        next(new Error("There is no permit with this ID!"));
    }
}
const drop = async (req, res, next) => {
    let permit = await DB.findOne({ id: req.params.id });
    if (permit) {
        let result = await DB.findByIdAndDelete(permit._id);
        Helper.fMsg(res, "Delete Permit Success!");
    } else {
        next(new Error("There is no permit with this ID!"));
    }
}


module.exports = {
    all, add, get, patch, drop
}