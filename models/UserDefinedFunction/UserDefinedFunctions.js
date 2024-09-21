const { sequelize } = require("../../models/index");

async function createUDFIfNotExists() {
  try {
    // SQL script to conditionally create the UDF if it does not exist
    const sql = `
      IF OBJECT_ID('dbo.fn_UomName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_UomName(@uomId INT)
          RETURNS VARCHAR(50)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(50);
              
              -- Select uom_name from unit_of_measurement
              SELECT @ret = ISNULL(v.uom_name, ''Invalid Vertical Code'')
              FROM unit_of_measurement v
              WHERE v.uom_id = @uomId;
              
              RETURN @ret;
          END;
        ');
      END;

       -- Check and create fn_containerType if it does not exist
      IF OBJECT_ID('dbo.fn_containerType', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_containerType(@containerTypeID INT)
          RETURNS VARCHAR(50)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select container_type_name from container_type_master
              SELECT @ret = ISNULL(c.container_type_name, ''Container Type Invalid'')
              FROM container_type_master c
              WHERE c.container_type_master_id = @containerTypeID;
              
              RETURN @ret;
          END;
        ');
      END;

           -- Check and create fn_containerPaymentTerm if it does not exist
      IF OBJECT_ID('dbo.fn_containerPaymentTerm', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_containerPaymentTerm(@paymentTermID INT)
          RETURNS VARCHAR(50)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select payment_term_container_name from payment_term_container_master
              SELECT @ret = ISNULL(p.payment_term_container_name, ''Payment Term Invalid'')
              FROM payment_term_container_master p
              WHERE p.payment_term_container_master_id = @paymentTermID;
              
              RETURN @ret;
          END;
        ');
      END;

       -- Check and create fn_transportPaymentType if it does not exist
      IF OBJECT_ID('dbo.fn_transportPaymentType', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_transportPaymentType(@paymentTypeID INT)
          RETURNS VARCHAR(50)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select payment_type_transport_name from payment_type_transport_master
              SELECT @ret = ISNULL(p.payment_type_transport_name, ''Payment Type Invalid'')
              FROM payment_type_transport_master p
              WHERE p.payment_type_transport_master_id = @paymentTypeID;
              
              RETURN @ret;
          END;
        ');
      END;

     -- Check and create fn_transportPaymentType if it does not exist
      IF OBJECT_ID('dbo.fn_GetCategoryName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_GetCategoryName(@CategoryId INT)
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select payment_type_transport_name from payment_type_transport_master
              SELECT @ret = ISNULL(c.category_name, ''Category Invalid'')
              FROM item_category_master c
              WHERE c.item_category_id = @CategoryId;
              
              RETURN @ret;
          END;
        ');
      END;

       -- Check and create fn_transportPaymentType if it does not exist
      IF OBJECT_ID('dbo.fn_GetPortDestinationName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_GetPortDestinationName(@PortDestinationId INT)
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select payment_type_transport_name from port_destination_master
              SELECT @ret = ISNULL(p.port_destination_name, ''Port Destination Invalid'')
              FROM port_destination_master p
              WHERE p.port_destination_id = @PortDestinationId;
              
              RETURN @ret;
          END;
        ');
      END;
    `;

    // Log the SQL query for debugging
    console.log("Executing SQL:", sql);

    // Execute the SQL command
    await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });

    console.log("UDF checked and created if not already present.");
  } catch (error) {
    // Log the error for debugging
    console.error("Error executing SQL:", error);
    if (error.original) {
      console.error("Original error details:", error.original);
    }
  }
}

// Execute the function to check and create the UDF
createUDFIfNotExists();

module.exports = createUDFIfNotExists;
