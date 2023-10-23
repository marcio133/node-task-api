const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./src/config/swagger_output.json");

const app = express();
const port = 3000;

const {
    errorLogger,
    errorResponder,
} = require("./src/middlewares/error.middleware");
const routes = require("./src/routes");

//Swagger
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//Parsers
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//middlewares
app.use(errorLogger);
app.use(errorResponder);

//Routes
app.use("/api", routes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});