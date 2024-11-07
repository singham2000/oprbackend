const db = require("../models");

// Function to get a document by ID and table name (collection name)
async function GetDocByIdAndTableName(id, tableName) {
  try {
    console.log(tableName, id);
    let document = await db.document.findAll({
        where: {
          table_name: tableName,
          linked_id: id,
          status: 1
        },
      });
    if (!document) {
        throw new Error(`No document found with ID ${id} in table ${tableName}`);
      }
    return document;
  } catch (error) {
    console.error("Error fetching document:", error.message);
    throw error; 
  }
}
module.exports = { GetDocByIdAndTableName };