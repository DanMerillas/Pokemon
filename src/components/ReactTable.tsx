import { TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Card } from './Card';





export function ReactTable(props: { data: any; filterFunction: any; allFunction:any}) {
    const [filterText1, setFilterText] = useState('');
    const [selectedRows, setSelectedRows] = useState([])
    const [filteredItems, setFilteredItems] = useState(props.data);

    const handleRowSelected = useCallback((state: any) => {
        setSelectedRows(state.selectedRows);
    }, []);



    const columns = [

        {
            name: 'Nombre',
            selector: (row: any) => row.name,
            sortable: true,
        }
    ];

    useEffect(() => {

        if (filterText1 && filterText1 !== "") {
            const filter = props.data.filter(
                (item: any) => {
                    return (item.name && item.name.toLowerCase().includes(filterText1.toLowerCase()))

                })

            setFilteredItems(filter)
        }
        else {
            setFilteredItems(props.data)
        }


    }, [filterText1, props.data])

    useEffect(() => {

        if(selectedRows && selectedRows.length > 0){
            const filter = selectedRows.map((s: any) => <Card pokemonUrl={s.url} />)
            props.filterFunction(filter)
        }
        else{
            props.allFunction()
        }
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRows])


    return (
        <>
            <TextField
                className="search"
                type="text"
                placeholder="Buscar pokemon"
                aria-label="Search Input"
                value={filterText1}
                onChange={(e: any) => setFilterText(e.target.value)}
            />
            <DataTable className='tablaReact' columns={columns} data={filteredItems} pagination selectableRows onSelectedRowsChange={handleRowSelected} selectableRowsHighlight={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5,10, 25, 50, 100]}
            />
        </>
    )

}