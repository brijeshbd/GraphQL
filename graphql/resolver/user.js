const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../../models/user");
const { userEvent } = require('./merge');

module.exports = {

    login: async ({ email, password }) => {
        try {
            const luser = await User.findOne({ email: email })
            if (!luser) { throw new Error("User not Found") }
            const valid = await bcrypt.compare(password, luser.password);
            if (!valid) { throw new Error("Password not Found") }
            const token = jwt.sign(
                { id: luser.id, email: luser.email, role: luser.role },
                process.env.SECRET_KEY,
                { expiresIn: '1d' }
            );
            return { userID: luser.id, token: token }
        }
        catch (err) { throw err; }
    },

    users: async (req) => {
        if (!req.isAuth) { throw new Error("Unauthenticate!"); }
        try {
            const events = await User.find();
            return events.map(event => {
                return userEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },

    createUser: async (args, req) => {
        try {
            const luser = await User.findOne({ email: args.userinput.email });
            if (luser) { throw new Error("User already exists"); }
            const hashedpassword = await bcrypt
                .hash(args.userinput.password, 12)
            const user = new User({
                email: args.userinput.email,
                role: args.userinput.role,
                password: hashedpassword
            });
            const result = await user.save();
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    }

}