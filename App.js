require('dotenv').config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/schema/index');
const rvalues = require('./graphql/resolver/index');
const bodyParser = require('body-parser');
const isAuth = require('./middleware/is-auth');
const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
app.use(isAuth);

app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: rvalues,
    graphiql: true
}));

mongoose.connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connection is established.");
})
    .catch((e) => {
        console.warn(e);
    });

app.listen(port, () => console.log("Listeing on http://localhost:3000"));
