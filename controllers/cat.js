const DB = require("../models/cat");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
    let result = await DB.find();
    Helper.fMsg(res, "Get All Category!", result);
}
const add = async (req, res, next) => {
    let dbCat = await DB.findOne({ name: req.body.name });
    if (dbCat) {
        next(new Error("This Category is already exist!"))
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, "Category Add Success!", result);
    }
}
const get = async (req, res, next) => {
    let dbCat = await DB.findById(req.params.id);
    if (dbCat) {
        let result = await DB.findById(dbCat._id);
        Helper.fMsg(res, "Get Single Category", result);
    } else {
        next(new Error("There is no Caterory with this ID!"));
    }
}
const patch = async (req, res, next) => {
    let dbCat = await DB.findById(req.params.id);
    if (dbCat) {
        await DB.findByIdAndUpdate(dbCat._id, req.body);
        let result = await DB.findById(dbCat._id);
        Helper.fMsg(res, "Edit Category Success", result);
    } else {
        next(new Error("There is no Caterory with this ID!"));
    }
}
const drop = async (req, res, next) => {
    let dbCat = await DB.findById(req.params.id);
    if (dbCat) {
        await DB.findByIdAndDelete(dbCat._id);
        Helper.fMsg(res, "Deleted Category!");
    } else {
        next(new Error("There is no Caterory with this ID!"));
    }
}
module.exports = {
    all,
    add,
    get,
    patch,
    drop
}

