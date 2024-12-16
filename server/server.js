const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router/auth-routes');
const contactRoute = require('./router/contact-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middleware/error');
const serviceRoute =require("./router/service-routes");
const adminRoute =require("./router/admin-router");
const adminContactRoute =require("./router/admin-router")

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PATCH", "HEAD"],
  credentials: true
};
app.use(cors(corsOptions));


// JSON parsing middleware
app.use(express.json());

// Mounting routes
app.use("/api/auth", router);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);


// admin route 

app.use("/api/admin",adminRoute)

app.use("api/admin",adminContactRoute)


// Error middleware
app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});




