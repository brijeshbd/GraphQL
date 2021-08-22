const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type User
    {
        _id :ID!
        role:String!
        email:String!
        password:String!
    }
    type AuthData
    {
        userID:ID!
        token:String!
    }

    type Assignment
    {
        _id:ID!
        description:String!
        publishedat:String!
        deadlinedate:String!
        assignedby:User!
        status:String
    }

    input AssignmentInput
    {
        studentlist:[String]!
        description:String!
        publishedat:String!
        deadlinedate:String!
        status:String
    }
    input UserInput
    {
        email:String!
        role:String!
        password:String!
    }


    type RootQuery{
        users:[User!]!
        login(email: String!, password: String!): AuthData!
        showAssignment:[Assignment!]!
    }

    type RootMutation
    {
        createUser(userinput:UserInput):User
        careteAssignemnt(assignmentinput:AssignmentInput):Assignment
        addSubmission(sid:String!,aid:String!):String!
        deleteAssignment(aid:String!):String!
    }

        schema
        {
            query:RootQuery
            mutation:RootMutation
        }

`);