import React, { ReactNode, useContext, useMemo } from 'react';

import { TableSortingContext } from '@/components/Table/state/TableSorting/TableSortingContext';
import { DownSvg, UpAndDownSvg, UpSvg } from '@/components/Table/icons';
import { EColumnSorting } from '@/components/Table/models/sorting.models';
import { TDataFieldAccessor } from '@/components/Table/models/data.models';
import { TableLoadingContext } from '@/components/Table/state/TableLoading/TableLoadingContext';

const SortableHeaderContainer = ({
    columnId,
    dataAccessor,
    children,
}: {
    columnId: string;
    dataAccessor: TDataFieldAccessor;
    children: ReactNode;
}) => {
    const { isLoading } = useContext(TableLoadingContext);

    const { tableSorting, setSorting } = useContext(TableSortingContext);
    const columnSorting = tableSorting[columnId];
    const sorting = columnSorting?.sorting;

    const handleToggleSort = () => {
        if (!columnSorting?.sorting) {
            setSorting({ columnId, dataAccessor, sorting: EColumnSorting.Asc });
        } else if (columnSorting.sorting === EColumnSorting.Asc) {
            setSorting({
                columnId,
                dataAccessor,
                sorting: EColumnSorting.Desc,
            });
        } else {
            setSorting({ columnId, dataAccessor, sorting: null });
        }
    };

    const sortIndicator = useMemo(() => {
        switch (sorting) {
            case EColumnSorting.Asc:
                return <DownSvg className="sort-svg" />;
            case EColumnSorting.Desc:
                return <UpSvg className="sort-svg" />;
            default:
                return <UpAndDownSvg className="sort-svg" />;
        }
    }, [sorting]);

    return (
        <div className="sortable-header-container">
            {children}
            {sortIndicator}
            <button className="sort-btn" disabled={isLoading} onClick={handleToggleSort}></button>
        </div>
    );
};

export default SortableHeaderContainer;
