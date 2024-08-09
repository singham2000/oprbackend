// app.js (or index.js)
const express = require('express');
const { handleNotFound, handleErrors } = require('./middleware/errorHandlers');
const handleError = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');


//import middleware
const setAuditFields = require('./middleware/setAuditFields.js')





// Routes Import
const itemRoute = require('./routes/itemRoutes');
const poRoute = require('./routes/poRoutes');
const rfqMasterRoute = require('./routes/rfqMasterRoutes');
const rfqItemDetailRoute = require('./routes/rfqItemDetailRoutes');
const userRoute = require('./routes/userRoutes');
const roleRoute = require('./routes/roleRoutes');
const branchRoute = require('./routes/branchRoutes');
const deptRoute = require('./routes/deptRoutes');
const purchaseLocRoute = require('./routes/purchlocationRoutes');
const divisionRoute = require('./routes/divisionRoutes');
const vendorRoute = require('./routes/vendorRoutes');
const menuRoute = require('./routes/menuRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const uomRoute = require('./routes/uomRoutes');
const oprRouter = require('./routes/oprRoutes.js');
const shipModeRouter = require('./routes/shipModeRoutes.js');
const oprItemsRouter = require('./routes/oprItemsRoutes.js');
const buyHouseRouter = require('./routes/buyHouseRoutes.js');
const quotationRouter = require('./routes/quotationRoutes.js');
const quotationItemsRouter = require('./routes/quotationItemsRoutes');
const itemCategoryRouter = require('./routes/itemCategoryRoutes.js')
const criaRouter = require('./routes/criaRoutes.js')
const nafdacCategoryRouter = require('./routes/nafdacCategoryRotues.js')
const nafdacRouter = require('./routes/nafdacRoutes.js');
const itemGroupRouter = require('./routes/itemGroupRotues.js');
const itemSubGroupRouter = require('./routes/itemSubGroupRotues.js');
const verticalRouter = require('./routes/verticalRoutes');
const companyRouter = require('./routes/companyRoutes');
const deliveryTimelineRouter = require('./routes/deliveryTimelineRoutes');
const deliveryTermsRouter = require('./routes/deliveryTermsRoutes');
const penaltyTermsRoutes = require('./routes/penaltyTermsRoutes');
const additionalCostRouter = require('./routes/additionalCostRoutes');
const leadTimeRouter = require('./routes/leadTimeRoutes');
const mailRoutes = require('./routes/mailRoutes.js')
const pfiRoutes = require('./routes/pfiRoutes.js')
const vendorTypeMasterRoutes = require('./routes/vendorTypeMasterRoutes');
const addressRoutes = require('./routes/addressRoutes.js');
const buyingHouseRoutes = require('./routes/buyHouseRoutes.js');
const buyingHouseRoutes2 = require('./routes/buyingHouseRoutes.js');



//payments
const paymentTypeMasterRoutes = require('./routes/paymentTypeMasterRoutes');
const paymentRequestMasterRoutes = require('./routes/paymentRequestMasterRoutes');
const paymentRequestTransactionsMasterRoutes = require('./routes/PaymentRequestTransactionsMaster.js');
const paymentTermsRouter = require('./routes/paymentTermsRoutes');
const payment = require('./routes/paymentRoutes.js')

const app = express();
const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(setAuditFields);

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Routes
app.use('/api/user', userRoute);
app.use('/api/role', roleRoute);
app.use('/api/vendor', vendorRoute);
app.use('/api/item', itemRoute);
app.use('/api/cria', criaRouter)
app.use('/api/nafdaccategory', nafdacCategoryRouter)
app.use('/api/nafdac', nafdacRouter)
app.use('/api/itemgroup', itemGroupRouter)
app.use('/api/itemsubgroup', itemSubGroupRouter);
app.use("/api/opr", oprRouter);
// app.use("/api/opritem", oprItemsRouter);
app.use('/api/rfq', rfqMasterRoute);
app.use('/api/rfqitem', rfqItemDetailRoute);
app.use('/api/po', poRoute);   /****/
app.use('/api/branch', branchRoute);
app.use('/api/dept', deptRoute);
app.use('/api/purchaselocation', purchaseLocRoute);
app.use('/api/menu', menuRoute);
app.use('/api/category', categoryRoute);
app.use('/api/uom', uomRoute);
app.use('/api/shipMode', shipModeRouter);
app.use("/api/delivery/timeline", deliveryTimelineRouter);
app.use("/api/buying", buyHouseRouter); 
app.use("/api/quotation", quotationRouter);
app.use("/api/quoteitems", quotationItemsRouter);
app.use("/api/itemcategory", itemCategoryRouter);
// app.use("/api/category", itemCategoryRouter);
app.use("/api/vertical", verticalRouter);
app.use("/api/company", companyRouter);
app.use('/api/division', divisionRoute);
app.use("/api/delivery/terms", deliveryTermsRouter);
app.use("/api/quotation/additionalcost", additionalCostRouter);
app.use("/api/leadtime", leadTimeRouter);
app.use('/api/mail', mailRoutes);
app.use('/api/pfi', pfiRoutes);
app.use('/api/vendor-types', vendorTypeMasterRoutes);


//payments
app.use("/api/paymentterms", paymentTermsRouter);
app.use('/api/penaltyterms', penaltyTermsRoutes);
app.use('/api/payment-types', paymentTypeMasterRoutes);
app.use('/api/paymentrequests', paymentRequestMasterRoutes);
app.use('/api/payment-transactions', paymentRequestTransactionsMasterRoutes);
app.use('/api/payment', payment);

// app.use('/api/payment',)

//addresss new
app.use('/api/address', addressRoutes);
app.use('/api/bh', buyingHouseRoutes);
app.use('/api/bhouse', buyingHouseRoutes2);


// Error handling middleware
app.use(handleError);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
