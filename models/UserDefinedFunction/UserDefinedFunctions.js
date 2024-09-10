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
    `;

    // Log the SQL query for debugging
    console.log('Executing SQL:', sql);

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
