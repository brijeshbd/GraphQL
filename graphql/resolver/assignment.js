const Assignment = require('../../models/assignment');
const Submission = require('../../models/submission');
const { show_stude_ass, show_tutor_ass, userEvent } = require('./merge');
const tdate = new Date();
module.exports = {

    deleteAssignment: async (args, req) => {
        if (!req.isAuth) { throw new Error("Unauthenticate!"); }
        if (req.role == "Tutor") {
            try {
                const findass = await Assignment.findOne({ _id: args.aid, assignedby: req.userId })
                if (findass) {
                    const d = await Assignment.deleteOne({ _id: args.aid });
                    if (d) { return "Deleted Sucessfully"; }
                }
                else {
                    return "You can not delete";
                }
            }
            catch (err) {
                throw err;
            }
        }
        else {
            return "You are not Teacher";
        }
    },


    showAssignment: async (req) => {
        if (!req.isAuth) { throw new Error("Unauthenticate!"); }
        if (req.role == "Student") {
            try {
                const assid = await Submission.find({ sid: req.userId });
                for (const i of assid.aid) {
                    const res = await Assignment.findByID({ i })
                    return show_stude_ass(res);
                }
            } catch (err) {
                throw err;
            }
        }
        else if (req.role == "Tutor") {
            try {
                const tdata = await Assignment.find({ tid: req.userId })
                return tdata.map(event => {
                    return show_tutor_ass(event);
                });
            } catch (err) {
                throw err;
            }
        }

    },

    addSubmission: async ({ sid, aid }, req) => {
        if (!req.isAuth) { throw new Error("Unauthenticate!"); }
        if (req.role == "Student") {
            try {
                const assres = await Assignment.findByID(aid);
                var ddate = assres.assignmentinput.deadlinedate;
                var fstatus;
                if (ddate < tdate) { fstatus = "OVERDUE" }
                else { fstatus = "SUBMITTED" }
                const f = await Submission.findOne({ sid: sid, aid: aid })
                if (f.status == "SUBMITTED") { return ("You have already Submitted") }
                const up = await Submission.updateOne({ sid: sid, aid: aid }, { $set: { status: fstatus } });
            } catch (err) { throw err };
        }
        else { return ("You are not Student") }
    },

    careteAssignemnt: async (args, req) => {
        if (!req.isAuth) { throw new Error("Unauthenticate!"); }
        // try {
        var finalstatus;
        const ddate = new Date(args.assignmentinput.deadlinedate);
        if (ddate > tdate) {
            finalstatus = "SCHEDULED"
        }
        else {
            finalstatus = "ONGOING"
        }
        const assignment = new Assignment({
            description: args.assignmentinput.description,
            publishedat: args.assignmentinput.publishedat,
            deadlinedate: args.assignmentinput.deadlinedate,
            status: finalstatus,
            assignedby: req._id
        });
        const asssave = await assignment.save();
        for (const type of args.assignmenr.studentlist) {
            const submission = new Submission({
                sid: type,
                aid: req_id,
                status: "PENDING"
            }).save();
        }


        // let studentlist;
        // try {
        //     const result = await assignment.save();
        //     studentlist = userEvent(result);
        //     const creator = await Assignment.findById(req._id);
        //     if (!creator) { throw new Error('User not found.') }
        //     creator.studentlist.push();
        //     await creator.save()
        //     return userstudents;
        // } catch (err) {
        //     throw err;
        // }
    }
}