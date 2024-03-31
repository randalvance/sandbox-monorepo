// import { useState } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { css } from '@emotion/react';

import mockdatajson from './mock-data.json';
import { useCallback, useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const previews = mockdatajson.limitPeriods[0].previews as unknown as any[];
const columnDefinitions = mockdatajson.columnDefinitions as AgGridReactProps['columnDefs'];

const HeaderComponent = ({ cpName, cpType }: { cpName: string, cpType: string }) => {
    return (
        <div>
            <h1 css={css`margin: 0; padding: 0`}>{cpName} ({cpType})</h1>
        </div>
    )

}

export const PreviewTable = () => {
    const colDefs = useMemo<AgGridReactProps['columnDefs']>(() => {
        return columnDefinitions!.map(cd => ({
            ...cd,
            headerClass: 'table-header-centered',
            headerGroupComponent: HeaderComponent,
            headerGroupComponentParams: {
                cpName: cd.headerName,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cpType: (cd as any).cpType
            }
        }))
    }, []);


    const autoGroupColumnDef: AgGridReactProps['autoGroupColumnDef'] = useMemo(() => {
        return {
            headerName: "Risk Grouping",
            minWidth: 300,
            cellRendererParams: {
                suppressCount: true
            }
        };
    }, []);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
        };
    }, []);

    const getDataPath: AgGridReactProps['getDataPath'] = useCallback((data: unknown) => {
      console.log("data", data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data as any).riskGroupHeirarchy;
    }, []);


    return (
        // wrapping container with theme & size
        <div
            className="ag-theme-quartz" // applying the grid theme
            css={css`
                height: 500px;
                padding-top: 10px;
                --ag-header-column-resize-handle-height: 100%;
                --ag-header-column-separator-color: red;
            `} // the grid will fill the size of the parent container
        >
            From {mockdatajson.limitPeriods[0].startDate} to {mockdatajson.limitPeriods[0].endDate}
            <AgGridReact
                treeData={true}
                getDataPath={getDataPath}
                rowData={previews}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                groupDefaultExpanded={-1}
                autoGroupColumnDef={autoGroupColumnDef}
            />
        </div>
    )
}