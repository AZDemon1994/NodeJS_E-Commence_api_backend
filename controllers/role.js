const DB = require("../models/role");
const permitDB = require("../models/permit");
const Helper = require("../utils/helper");
const { populate } = require("../models/permit");


const all = async (req, res, next) => {
    let roles = await DB.find().populate("permits", "-__v").select("-__v");
    Helper.fMsg(res, "Get All Role!", roles);
}
const add = async (req, res, next) => {
    let dbRole = await DB.findOne({ name: req.body.name });
    if (dbRole) {
        next(new Error("This permit name is already use!"));
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, "Add Permit Success!", result);
    }
}
const get = async (req, res, next) => {
    let role = await DB.findOne({ id: req.params.id });
    if (role) {
        let result = await DB.findById(role._id).select("-__v");
        Helper.fMsg(res, "Get Single Permit!", result);
    } else {
        next(new Error("There is no permit with this ID!"));
    }
}
const patch = async (req, res, next) => {
    let role = await DB.findOne({ id: req.params.id });
    if (role) {
        await DB.findByIdAndUpdate(role._id, req.body);
        let result = await DB.findById(role._id);
        Helper.fMsg(res, "Edit Permit Success!", result);
    } else {
        next(new Error("There is no permit with this ID!"));
    }
}
const drop = async (req, res, next) => {
    let role = await DB.findOne({ id: req.params.id });
    if (role) {
        await DB.findByIdAndDelete(role._id);
        Helper.fMsg(res, "Delete Permit Success!");
    } else {
        next(new Error("There is no permit with this ID!"));
    }
}

const roleAddPermit = async (req, res, next) => {
    let dbRole = await DB.findById(req.body.roleId);
    let dbPermit = await permitDB.findById(req.body.permitId)
    if (dbRole && dbPermit) {
        let dbResult = await DB.findOne({ permits: dbPermit._id })
        if (dbResult) {
            if (dbResult.name == dbRole.name) {
                next(new Error("Permit already add in this Role!"))
            } else {
                await DB.findByIdAndUpdate(dbRole._id, { $push: { permits: dbPermit._id } });
                let result = await DB.findById(dbRole._id);
                Helper.fMsg(res, "Permit add to role Success!", result);
            }
        } else {
            await DB.findByIdAndUpdate(dbRole._id, { $push: { permits: dbPermit._id } });
            let result = await DB.findById(dbRole._id);
            Helper.fMsg(res, "Permit add to role Success!", result);
        }

    } else {
        next(new Error("Role ID or Permit Id is not valide!"));
    }
}

const roleRemovePermit = async (req, res, next) => {
    let dbRole = await DB.findById(req.body.roleId);
    let dbPermit = await permitDB.findById(req.body.permitId)

    if (dbRole && dbPermit) {
        let dbResult = await DB.findOne({ permits: dbPermit._id })
        if (dbResult) {
            if (dbResult.name == dbRole.name) {
                await DB.findByIdAndUpdate(dbRole._id, { $pull: { permits: dbPermit._id } });
                Helper.fMsg(res, "Permit remove from role Success!");
            } else {
                next(new Error("Role don't have this permit already!"))
            }
        } else {
            next(new Error("Role don't have this permit already!"))
        }
    } else {
        next(new Error("Role ID or Permit Id is not valide!"));
    }
}


module.exports = {
    all, add, get, patch, drop,
    roleAddPermit, roleRemovePermit
}