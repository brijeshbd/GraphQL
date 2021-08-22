
const show_stude_ass = res => {
    return {
        ...res._doc,
        _id: res.id,
    };
};
exports.show_stude_ass = show_stude_ass;


const show_tutor_ass = event => {
    return {
        ...event._doc,
        _id: event.id,
    };
};
exports.show_tutor_ass = show_tutor_ass;


const userEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        email: event._doc.email,
        role: event._doc.role
        // creator: user.bind(this, event.creator)
    };
};
exports.userEvent = userEvent;

const studentList = event => {
    return {
        ...event._doc,
        _id: event.id,
        email: event._doc.email,
        role: event._doc.role,
    };
}
exports.studentList = studentList;