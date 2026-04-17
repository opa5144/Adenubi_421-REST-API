   // app.js
   const express = require('express');
   const swaggerUi = require('swagger-ui-express');
   const swaggerJSDoc = require('swagger-jsdoc');

   const app = express();
   app.use(express.json());
   const port = 3000;

   const mongoose = require('mongoose');
   // MongoDB Connection
       mongoose.connect(process.env.MONGO_URI, {
//my-mongodb replaced host.docker.internal
  //useNewUrlParser: true,
  //useUnifiedTopology: true
    });

   // Swagger definition
   const swaggerOptions = {
       swaggerDefinition: {
           openapi: '3.0.0',
           info: {
               title: 'Adenubi_421',
               version: '1.0.0',
               description: 'API documentation using Swagger',
           },
           servers: [
               {
                   url: `http://host.docker.internal:${port}`,
               },
           ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', 
            },
        },
    },
       },
       apis: ['./routes/*.js'], // Path to your API docs
   };


   const swaggerDocs = swaggerJSDoc(swaggerOptions);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
   
   const customerRoutes = require('./routes/customers');
   app.use('/customers', customerRoutes);

   const orderRoutes = require('./routes/orders');
   app.use('/orders', orderRoutes);

   const paymentRoutes = require('./routes/payments');
   app.use('/payments', paymentRoutes);

   //process.env.PORT, used to be port
   app.listen(process.env.PORT, () => {
       console.log(`Server running at http://localhost:${process.env.PORT}`);
   });