import React from 'react'
import OprItemList from './OprItemList'
import GenerateRfqConformation from './RfqConformation'
import { useMyContext } from 'contexts/RfqItemContex'
import MainCard from 'components/MainCard';
import Badge from '@mui/material/Badge';
import { DataGrid } from '@mui/x-data-grid';
import GridExample from './grid/GridExample'

import {
    Box,
    Button,
    Paper,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
    TableHead,
    IconButton
} from '@mui/material';


const GenrateRfqPage = () => {
    const { itemCount, addToRfq, setSelectedRows, selectedRows } = useMyContext();

    const [showRfqConfrm, setShwoRfqConfrm] = React.useState(false)
    const [showItemForm, setShowItemForm] = React.useState();
    const handleGenrateRfq = () => {
        setSelectedRows([])
        addToRfq(selectedRows)
        setShwoRfqConfrm(true)
        console.log(selectedRows);
        let itemlist = selectedRows.map(item => item.opr_item_id)
        console.log(itemlist);
    }

    const handleCloseForm = () => {
        setShwoRfqConfrm(false)

    }

    
    return (
        <>
            <MainCard
                title={
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        {!showRfqConfrm ? <span>RFQ Management</span> : <span>Genrate RFQ</span>}

                        {!showRfqConfrm ? (
                            // onClick={handleCreateItem}
                            <Box sx={{ mx: '10px', my: '12px' }}>
                                <Badge badgeContent={itemCount} color="error">
                                    <Button color="primary" className="plus-btn-color" onClick={handleGenrateRfq} >
                                        Generate RFQ
                                    </Button>
                                </Badge>
                            </Box>
                        ) : (
                            <Box sx={{ mx: '10px', my: '12px' }}>
                                <Button variant='outlined' className="plus-btn-color" onClick={handleCloseForm}>
                                    Back
                                </Button>
                            </Box>
                        )}
                    </Box>
                }
            >

                {
                    showRfqConfrm ? <GenerateRfqConformation /> : <OprItemList />
                }
            </MainCard>
        </>
    )
}
export default GenrateRfqPage



