const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mssql",
    }
);

//load model

let db = {};

//********************************************PO MODEL********************************************/

//OTHER


db.sequelize = sequelize;
db.menu = require("./Masters/menu_master.js")(sequelize, DataTypes);
db.purchaseLocation = require("./purchase_location_master.js")(
    sequelize,
    DataTypes
);
db.role = require("./Masters/role_master.js")(sequelize, DataTypes);
db.user = require("./user_master.js")(sequelize, DataTypes);
db.ShipMode = require("./Masters/ship_mode_master.js")(sequelize, DataTypes);
db.series_master = require("./Masters/series_master.js")(sequelize, DataTypes);
db.desigMaster = require("./designation_master.js")(sequelize, DataTypes);
db.CurrencyConversion = require("./CurrencyConversion.js")(
    sequelize,
    DataTypes
);



//SHIPMENT
db.DeliveryTimeline = require("./delivery_timeline_opr.js")(
    sequelize,
    DataTypes
);
db.delivery_terms_quo = require("./delivery_terms_quo.js")(
    sequelize,
    DataTypes
);
db.additional_cost = require("./addition_cost.js")(sequelize, DataTypes);
db.lead_time_quo = require("./lead_time.js")(sequelize, DataTypes);

//COMPANY
db.CompanyMaster = require("./Company/company_master.js")(sequelize, DataTypes);
db.AddressMaster = require("./Address/address_master.js")(sequelize, DataTypes);
db.AddressTypeMaster = require("./Address/address_type.js")(
    sequelize,
    DataTypes
);

//buying house related
db.BuyingHouse = require("./BuyingHouse/buyinghouse_master.js")(
    sequelize,
    DataTypes
);
db.GrnMaster = require("./BuyingHouse/grn_master.js")(sequelize, DataTypes);

db.DeptDesigMapping = require("./dept_desig_mapping.js")(sequelize, DataTypes);
db.branch = require("./branch_master.js")(sequelize, DataTypes);
db.Division = require("./division.js")(sequelize, DataTypes);
db.Vertical = require("./Masters/vertical_master.js")(sequelize, DataTypes);

//OPR
db.OprMaster = require("./Opr/opr_master.js")(sequelize, DataTypes);
db.OprItems = require("./Opr/opr_items.js")(sequelize, DataTypes);

//ITEM
db.ItemVendorMap = require("./ItemVendorMap.js")(sequelize, DataTypes);
db.CategoryMaster = require("./Item/item_category_master.js")(sequelize, DataTypes);
db.SubCategoryMaster = require("./Item/item_sub_group_master.js")(
    sequelize,
    DataTypes
);
db.ItemsMaster = require("./Item/item_master.js")(sequelize, DataTypes);
db.UomMaster = require('./Masters/uom_master.js')(sequelize, DataTypes);

db.ItemSuperGroupMaster = require("./Item/item_super_group_master.js")(sequelize, DataTypes);
db.ItemGroupMaster = require("./Item/item_group_master.js")(sequelize, DataTypes);
db.ItemSubGroupMaster = require("./Item/item_sub_group_master.js")(sequelize, DataTypes);
db.Department = require("./department_master.js")(sequelize, DataTypes);
db.CriaMaster = require("./cria_master.js")(sequelize, DataTypes); 1
db.Nafdac = require("./nafdacMaster.js")(sequelize, DataTypes);
db.NafdacCategoryMaster = require("./nafdac_category_master.js")(sequelize, DataTypes);

//VENDOR
db.vendor = require("./Vendor/vendor_master.js")(sequelize, DataTypes);
db.VendorsMaster = require("./Vendor/vendor_master.js")(sequelize, DataTypes);
db.VendorsBanksDetailsMaster =
    require("./Vendor/vendor_banksDetails_master.js")(sequelize, DataTypes);
db.VendorsAddressDetailsMaster =
    require("./Vendor/vendor_adddress_details_master.js")(sequelize, DataTypes);
db.VendorTypeMaster = require("./Vendor/VendorTypeMaster.js")(
    sequelize,
    DataTypes
);

//EMAIL
db.EmailMessage = require("./email_message_master.js")(sequelize, DataTypes);
db.EmailAttachments = require("./email_attachments.js")(sequelize, DataTypes);

//PFI
db.form_m = require("./Pfi/FormM")(sequelize, DataTypes);
db.Pfi_master = require("./pfi_master.js")(sequelize, DataTypes);
db.Pfi_line_items = require("./pfi_line_item.js")(sequelize, DataTypes);


//RFQ
db.rfqitem = require("./Rfq/rfq_Item_master.js")(sequelize, DataTypes);
db.RfqItemDetail = require("./Rfq/rfq_Item_master.js")(sequelize, DataTypes);
db.rfq = require("./Rfq/rfq_master.js")(sequelize, DataTypes);
db.rfqitem = require("./Rfq/rfq_Item_master.js")(sequelize, DataTypes);
// db.status_master = require("./status_master")(sequelize, DataTypes);

//service rfq
db.ServiceMaster = require("./Services/services_master.js")(
    sequelize,
    DataTypes
);
db.ServiceRFQ = require("./Services/service_rfq_master.js")(
    sequelize,
    DataTypes
);
db.ServiceQUO = require("./Services/Service_Quotation.js")(
    sequelize,
    DataTypes
);


db.ServiceTypeMaster = require("./Services/services_type_master.js")(sequelize, DataTypes);

//Po
db.po_master = require("./Po/po_master.js")(sequelize, DataTypes);
db.po_items = require("./Po/po_items.js")(sequelize, DataTypes);

//QUOTATION
db.quotation_master = require("./Quotation/quotation_master.js")(
    sequelize,
    DataTypes
);
db.quotation_items = require("./Quotation/quotation_items.js")(
    sequelize,
    DataTypes
);
db.QuoDoc = require("./Quotation/quotation_docs.js")(sequelize, DataTypes);
db.quotation_master = require("./Quotation/quotation_master.js")(
    sequelize,
    DataTypes
);
db.quotation_items = require("./Quotation/quotation_items.js")(
    sequelize,
    DataTypes
);

//PAYMENTS
// db.PaymentTypeMaster = require('./paymentTypes.js')(sequelize, DataTypes)
// db.payment_terms_quo = require('./payment_terms_quo.js')(sequelize, DataTypes)

db.PaymentRequestTransactionsMaster =
    require("./Payments/PaymentRequestTransactionsMaster .js")(
        sequelize,
        DataTypes
    );
db.PenaltyTermsMaster = require("./Payments/PenaltyTermsMaster.js")(
    sequelize,
    DataTypes
);
db.PaymentTerms = require("./Payments/PaymentTerms.js")(sequelize, DataTypes);
db.PaymentTypeMaster = require("./Payments/paymentTypes.js")(sequelize, DataTypes);
db.PaymentRequestMaster = require("./Payments/PaymentRequestMaster.js")(sequelize, DataTypes);
db.PaymentTermsMilesStones = require("./Payments/PaymentsTermsMileStones.js")(sequelize, DataTypes);

//OPO
db.OpoMaster = require("./Opo/opo_master.js")(sequelize, DataTypes);
db.OpoItems = require("./Opo/opo_items.js")(sequelize, DataTypes);


//PFI
db.commercial_invoice = require("./Pfi/CommercialInvoice")(
    sequelize,
    DataTypes
);
db.insurance = require("./Pfi/Insurance")(sequelize, DataTypes);
db.letter_of_credit = require("./Pfi/LetterOfCredit")(sequelize, DataTypes);
db.son_pfi = require("./Pfi/SonPfi")(sequelize, DataTypes);
db.paar = require("./Pfi/Paar")(sequelize, DataTypes);


//Operations
db.operations_nafdac = require("./Opreations/OperationsNafdac")(
    sequelize,
    DataTypes
);

db.operations_nafdac_master = require("./Opreations/OperationsNafdacMaster.js")(sequelize, DataTypes);
db.operations_nafdac_lapse = require("./Opreations/OperationsNafdacLapse")(sequelize, DataTypes);
db.operations_son = require("./Opreations/OperationsSon")(sequelize, DataTypes);
db.operations_son_lapse = require("./Opreations/OperationsSonLapse")(
    sequelize,
    DataTypes
);
db.transport_operation_lapse =
    require("./Opreations/TransportOperationLapse.js")(sequelize, DataTypes);
db.container_allocation = require("./Opreations/ContainerAllocation.js")(
    sequelize,
    DataTypes
);
db.govt_charges = require("./Opreations/GovtCharges")(sequelize, DataTypes);
db.shipping_lapse = require("./Opreations/ShippingLapse")(sequelize, DataTypes);
db.add_shippment_container = require("./Opreations/AddShippingContainer.js")(sequelize, DataTypes);
db.shippment_container_detail = require("./Opreations/ShippingContainerDetails.js")(sequelize, DataTypes);

//Masters
db.approval_matrix__master = require("./Masters/ApprovalMatrixMaster.js")(
    sequelize,
    DataTypes
);
db.approval_matrix = require("./Masters/ApprovalMatrix")(sequelize, DataTypes);
db.transport_operation_lapse_master =
    require("./Masters/TransportOperationLapseMaster.js")(sequelize, DataTypes);
db.container_type_master = require("./Masters/ContainerTypesMasters")(
    sequelize,
    DataTypes
);
db.payment_term_container_master =
    require("./Masters/PaymentTermContainerMaster")(sequelize, DataTypes);
db.payment_type_transport_master =
    require("./Masters/PaymentTypeTransportMaster.js")(sequelize, DataTypes);
db.add_expense_charges_master = require("./Masters/AddExpenseCharges")(
    sequelize,
    DataTypes
);
db.payment_type_charges_master = require("./Masters/PaymentTypeCharges.js")(
    sequelize,
    DataTypes
);
db.shipping_lapse_master = require("./Masters/ShippingLapse")(sequelize, DataTypes);
db.port_destination_master = require("./Masters/PortDestinationMaster.js")(
    sequelize,
    DataTypes
);

//OPO
db.opo_master = require('./OverseasPurchaseOrder/Opo.js')(sequelize, DataTypes);
db.opo_items = require('./OverseasPurchaseOrder/OpoItems.js')(sequelize, DataTypes);



//Packing
db.PackageTypeMaster = require('./Packing/PackageType.js')(sequelize, DataTypes);

//Shipping
db.ShippingMaster = require('./Shipping/shiping_master.js')(sequelize, DataTypes);
db.Container = require('./Shipping/container.js')(sequelize, DataTypes);
db.VesselDetails = require('./Shipping/vessel_details.js')(sequelize, DataTypes);
db.ShippingExpenses = require('./Shipping/shipping_expensesModal.js')(sequelize, DataTypes);

//document Master
db.ApprovalMatrix = require('./Approval/ApprovalMatrix.js')(sequelize, DataTypes);
db.ApprovalLog = require('./Approval/ApprovalLog.js')(sequelize, DataTypes);
db.reqdocMaster = require('./required_doc_list.js')(sequelize, DataTypes);
db.document = require("./Pfi/Document")(sequelize, DataTypes);
db.assessment = require("./Opreations/Assessment.js")(sequelize, DataTypes);

// Set up associations
const models = { ...db };
Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});

sequelize
    .sync({ alter: false })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch((error) => {
        console.error("Error synchronizing the database:", error);
    });
    
module.exports = {
    sequelize,
    ...models,
}; 
