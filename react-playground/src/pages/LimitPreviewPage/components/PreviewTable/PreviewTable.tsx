import { useState } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';



export const PreviewTable = () => {
     // Row Data: The data to be displayed.
    const [rowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);
    
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs] = useState<AgGridReactProps['columnDefs']>([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);

    return (
        // wrapping container with theme & size
        <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}