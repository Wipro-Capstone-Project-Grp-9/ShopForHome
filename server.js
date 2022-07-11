const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const expressValidator = require("express-validator");
require("dotenv").config({ path: __dirname + "/.env" });
// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");
const csv = require("csvtojson");
const Product = require("./models/product");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "😊Shop For Home Swagger Documentation😊",
      version: "1.0.0",
      description: "An API and interactive swagger documentation for Shop For Home App😊",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

// app
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// db connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://swathi:swathi@cluster0.navzg.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};
connectDB();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// csv()
// .fromFile('./Book1.csv')
// .then((jsonObj)=>{
//     console.log(jsonObj);
//     for(var x=0;x<jsonObj;x++){
//          temp = parseFloat(jsonObj[x].Test1)
//          jsonObj[x].Test1 = temp;
//          temp = parseFloat(jsonObj[x].Test2)
//          jsonObj[x].Test2 = temp;
//          temp = parseFloat(jsonObj[x].Test3)
//          jsonObj[x].Test3 = temp;
//          temp = parseFloat(jsonObj[x].Test4)
//          jsonObj[x].Test4 = temp;
//          temp = parseFloat(jsonObj[x].Final)
//          jsonObj[x].Final = temp;
//      }
//      Product.insertMany(jsonObj,(err,data)=>{
//             if(err){
//                 console.log(err);
//             }
//      });
//    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
