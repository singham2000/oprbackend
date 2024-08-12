const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mssql'
});


//load model 

let db = {}

//********************************************PO MODEL********************************************/

//OTHER
db.sequelize = sequelize;
db.menu = require('./menu_master.js')(sequelize, DataTypes)
db.purchaseLocation = require('./purchase_location_master.js')(sequelize, DataTypes)
db.role = require('./role_master.js')(sequelize, DataTypes)
db.user = require('./user_master.js')(sequelize, DataTypes)
db.ShipMode = require('./ship_mode_master.js')(sequelize, DataTypes)
db.series_master = require('./series_master.js')(sequelize, DataTypes);
db.desigMaster = require('./designation_master.js')(sequelize, DataTypes)
db.CurrencyConversion = require('./CurrencyConversion.js')(sequelize, DataTypes);


//SHIPMENT
db.DeliveryTimeline = require('./delivery_timeline_opr.js')(sequelize, DataTypes)
db.delivery_terms_quo = require('./delivery_terms_quo.js')(sequelize, DataTypes)
db.additional_cost = require('./addition_cost.js')(sequelize, DataTypes)
db.lead_time_quo = require('./lead_time.js')(sequelize, DataTypes)


//COMPANY
db.BuyingHouse = require('./buyinghouse_master.js')(sequelize, DataTypes)
db.DeptDesigMapping = require('./dept_desig_mapping.js')(sequelize, DataTypes)
db.branch = require('./branch_master.js')(sequelize, DataTypes)
db.Division = require('./division.js')(sequelize, DataTypes)
db.Vertical = require('./vertical_master.js')(sequelize, DataTypes)
// db.company_master = require('./company_master.js')(sequelize, DataTypes)


//OPR
db.OprMaster = require('./Opr/opr_master.js')(sequelize, DataTypes);
db.OprItems = require('./Opr/opr_items.js')(sequelize, DataTypes);

//ITEM
db.ItemVendorMap = require('./ItemVendorMap.js')(sequelize, DataTypes)
db.CategoryMaster = require('./item_category_master.js')(sequelize, DataTypes);
db.SubCategoryMaster = require('./item_subCategory_master.js')(sequelize, DataTypes);
db.ItemsMaster = require('./item_master.js')(sequelize, DataTypes)
db.UomMaster = require('./uom_master.js')(sequelize, DataTypes);
db.ItemGroupMaster = require('./item_group_master.js')(sequelize, DataTypes);
db.ItemSubGroupMaster = require('./item_subCategory_master.js')(sequelize, DataTypes);
db.Department = require('./department_master.js')(sequelize, DataTypes);
db.CriaMaster = require('./cria_master.js')(sequelize, DataTypes);
db.Nafdac = require('./nafdacMaster.js')(sequelize, DataTypes);
db.NafdacCategoryMaster = require('./nafdac_category_master.js')(sequelize, DataTypes);



//VENDOR
db.VendorsMaster = require('./Vendor/vendor_master.js')(sequelize, DataTypes)
db.VendorsBanksDetailsMaster = require('./Vendor/vendor_banksDetails_master.js')(sequelize, DataTypes)
db.VendorsAddressDetailsMaster = require('./Vendor/vendor_adddress_details_master.js')(sequelize, DataTypes)
db.VendorTypeMaster = require('./Vendor/VendorTypeMaster.js')(sequelize, DataTypes);
db.vendor = require('./Xvendor_master_old.js')(sequelize, DataTypes)

//EMAIL
db.EmailMessage = require('./email_message_master.js')(sequelize, DataTypes);
db.EmailAttachments = require('./email_attachments.js')(sequelize, DataTypes);

//PFI
db.Pfi_master = require('./pfi_master.js')(sequelize, DataTypes);
db.Pfi_line_items = require('./pfi_line_item.js')(sequelize, DataTypes);

//RFQ
db.rfqitem = require('./Rfq/rfq_Item_master.js')(sequelize, DataTypes)
db.RfqItemDetail = require('./Rfq/rfq_Item_master.js')(sequelize, DataTypes)
db.rfq = require('./Rfq/rfq_master.js')(sequelize, DataTypes)
db.rfqitem = require('./Rfq/rfq_Item_master.js')(sequelize, DataTypes)
db.status_master = require('./status_master')(sequelize, DataTypes);

//OPO
db.po_master = require('./Po/po_master.js')(sequelize, DataTypes)
db.po_items = require('./Po/po_items.js')(sequelize, DataTypes);


//QUOTATION
db.quotation_master = require('./Quotation/quotation_master.js')(sequelize, DataTypes);
db.quotation_items = require('./Quotation/quotation_items.js')(sequelize, DataTypes);
db.QuoDoc = require('./Quotation/quotation_docs.js')(sequelize, DataTypes);
db.quotation_master = require('./Quotation/quotation_master.js')(sequelize, DataTypes);
db.quotation_items = require('./Quotation/quotation_items.js')(sequelize, DataTypes);


//PAYMENTS
db.PaymentTypeMaster = require('./paymentTypes.js')(sequelize, DataTypes)
db.PaymentRequestMaster = require('./Payments/PaymentRequestMaster.js')(sequelize, DataTypes)
db.PaymentRequestTransactionsMaster = require('./Payments/PaymentRequestTransactionsMaster .js')(sequelize, DataTypes)
db.PenaltyTermsMaster = require('./Payments/PenaltyTermsMaster.js')(sequelize, DataTypes)
db.payment_terms_quo = require('./payment_terms_quo.js')(sequelize, DataTypes)
db.PaymentTerms = require('./Payments/PaymentTerms.js')(sequelize, DataTypes)

//OPO
db.OpoMaster = require('./Opo/opo_master.js')(sequelize, DataTypes);
db.OpoItems = require('./Opo/opo_items.js')(sequelize, DataTypes);

//COMPANY
db.CompanyMaster = require('./Company/company_master.js')(sequelize, DataTypes);
db.AddressMaster = require('./Address/address_master.js')(sequelize, DataTypes);
db.AddressTypeMaster = require('./Address/address_type.js')(sequelize, DataTypes);

// Set up associations
const models = { ...db };


// Call associate methods
Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

sequelize.sync()  
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Error synchronizing the database:', error);
    });
module.exports = {
    sequelize,
    ...models
};