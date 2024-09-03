const { GrnMaster, po_items, po_master } = require('../../models'); // Adjust import based on actual file structure


//genrate new grn enty and same time update grn_quantity in po item
exports.genrateGrn = async (req, res, next) => {
    console.log(req.body)
    try {
        const { buying_house_id, po_id, vendor_id, created_by, po_item_id_lists } = req.body
        console.log(po_item_id_lists)
        const newGrnEntry = await GrnMaster.create(
            {
                buying_house_id,
                po_id,
                vendor_id,
                created_by
            }
        )

        //update po status to 10 
        await po_master.update({
            grn_status: 1
        },
            {
                where: { po_id }
            }
        )

        // update grn qunatity in  po_item list 
        let pro = po_item_id_lists.map(async (item) => {
            const a = po_items.update({
                grn_qty: item.grn_qty,
                update_by: created_by
            }, {
                where: { po_item_id: item.po_item_id }
            });
        })
        const g = Promise.all(pro).then((res) => console.log(res));
        res.status(200).json({ message: "Grn Added Sucess fully" })
    } catch (error) {
        next(error)
    }

}


//genrate new grn enty and same time update grn_quantity in po item
exports.genrateList = async (req, res, next) => {
    try {
        const grnList = await GrnMaster.findAll()
        res.status(200).json(grnList)
    } catch (error) {
        next(error)
    }
}



