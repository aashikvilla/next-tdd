'use client'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface TableProps {
    columns: GridColDef[],
    rows:any[]
}


function Table({rows,columns}:TableProps) {
    return (
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            disableVirtualization
          />
        </div>
      );
}

export default Table