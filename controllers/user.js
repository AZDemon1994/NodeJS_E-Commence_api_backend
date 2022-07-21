const DB = require("../models/user");
const roleDB = require("../models/role.js");
const permitDB = require("../models/permit.js");
const Helper = require("../utils/helper");

const register = async (req, res, next) => {
    let dbEmailUser = await DB.findOne({ email: req.body.email });
    if (dbEmailUser) {
        next(new Error("Email is already use!"));
        return;
    }
    let dbPhoneUser = await DB.findOne({ phone: req.body.phone });
    if (dbPhoneUser) {
        next(new Error("Phone is already use!"));
        return;
    }
    req.body.passwd = Helper.comparePass(req.body.passwd);
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Register Success!", result);
}
const login = async (req, res, next) => {
    let user = await DB.findOne({ phone: req.body.phone });
    if (user) {
        if (Helper.comparePass(req.body.passwd, user.passwd)) {
            let loginUser = user.toObject();
            delete loginUser.passwd;
            loginUser.token = Helper.makeToken(loginUser);
            Helper.fMsg(res, "Login Success!", loginUser);
        } else {
            next(new Error("Phonenumber or Password is Wrong!"));
        }
    } else {
        next(new Error("Phonenumber or Password is Wrong!"));
    }
}

const addRole = async (req, res, next) => {
    let dbUser = await DB.findById(req.body.userId);
    let dbRole = await roleDB.findById(req.body.roleId);
    if (dbUser && dbRole) {
        let foundRole = dbUser.roles.find(roleid => roleid.equals(dbRole._id));
        if (foundRole) {
            next(new Error("This role is already add in this user!"));
        } else {
            await DB.findByIdAndUpdate(dbUser._id, { $push: { roles: dbRole._id } });
            let result = await DB.findById(dbUser._id).select("-passwd -__v");
            Helper.fMsg(res, "Added role to User!", result);
        }
    }
}

const removeRole = async (req, res, next) => {
    let dbUser = await DB.findById(req.body.userId);
    if (dbUser) {
        let foundRole = dbUser.roles.find(roleid => roleid.equals(req.body.roleId));
        if (foundRole) {
            await DB.findByIdAndUpdate(dbUser._id, { $pull: { roles: req.body.roleId } });
            let result = await DB.findById(dbUser._id).select("-passwd -__v");
            Helper.fMsg(res, "Removed role to User!", result);
        } else {
            next(new Error("User haven't this role!"));

        }
    }
}
const addPermit = async (req, res, next) => {
    let dbUser = await DB.findById(req.body.userId);
    let dbPermit = await permitDB.findById(req.body.permitId);
    if (dbUser && dbPermit) {
        let foundPermit = dbUser.roles.find(permitid => permitid.equals(dbPermit._id));
        if (foundPermit) {
            next(new Error("This Permition is already add in this user!"));
        } else {
            await DB.findByIdAndUpdate(dbUser._id, { $push: { permits: dbPermit._id } });
            let result = await DB.findById(dbUser._id).select("-passwd -__v");
            Helper.fMsg(res, "Added Permition to User!", result);
        }
    }
}

const removePermit = async (req, res, next) => {
    let dbUser = await DB.findById(req.body.userId);
    if (dbUser) {
        let foundPermit = dbUser.permits.find(permitid => permitid.equals(req.body.permitId));
        if (foundPermit) {
            await DB.findByIdAndUpdate(dbUser._id, { $pull: { permits: req.body.permitId } });
            let result = await DB.findById(dbUser._id).select("-passwd -__v");
            Helper.fMsg(res, "Removed Permit to User!", result);
        } else {
            next(new Error("User haven't this Permit!"));

        }
    }
}




module.exports = {
    register,
    login,
    addRole, removeRole,
    addPermit, removePermit
}