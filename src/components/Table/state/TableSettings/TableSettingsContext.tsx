import { createContext, ReactNode, useMemo, useState } from 'react';

import {
    EColumnType,
    EPositionInRow,
    ITableColumnConfig,
    ITableConfig,
    ITableInjectableColumnConfig,
} from '@/components/Table/Table.models';

const defaultTableConfig = {
    isMultiSortEnabled: true,
    isRowCountEnabled: true,
    isSearchEnabled: true,
    // static settings:
    defaultSorting: [],
    isTableSettingChangeable: true,
    isMultiSortSettingsEnabled: true,
};

const rowCountColumnConfig: ITableInjectableColumnConfig = {
    columnId: 'rowCount',
    label: 'Nr',
    dataAccessor: 'rowCount',
    columnDataType: EColumnType.Nr,
    isSortable: false,
    isAutoGenerated: true,
    positionInRow: 0,
};

const TableSettingsContext = createContext<{
    // Data:
    columnConfigList: ITableColumnConfig[];
    autoGenColumnConfigList: ITableColumnConfig[];
    fullColumnConfigList: ITableColumnConfig[];
    isRowCountEnabled: boolean;
    isMultiSortEnabled: boolean;
    isMultiSortSettingsEnabled: boolean;
    isTableSettingChangeable: boolean;
    isSearchEnabled: boolean;
    // Functions:
    setColumnConfigList: (newColumnConfigList: ITableColumnConfig[]) => void;
    setIsRowCountEnabled: (isRowCountEnabled: boolean) => void;
}>({
    // Data:
    columnConfigList: [],
    autoGenColumnConfigList: [],
    fullColumnConfigList: [],
    isRowCountEnabled: true,
    isMultiSortEnabled: true,
    isMultiSortSettingsEnabled: true,
    isTableSettingChangeable: true,
    isSearchEnabled: true,
    // Functions:
    setColumnConfigList: (newColumnConfigList) => null,
    setIsRowCountEnabled: (isRowCountEnabled) => null,
});

const TableSettingsProvider = ({
    initColumnConfigList = [],
    initTableConfig = {},
    children,
}: {
    initColumnConfigList: ITableColumnConfig[];
    initTableConfig: ITableConfig;
    children: ReactNode;
}) => {
    const defaultTableSettings = useMemo(
        () => ({ ...defaultTableConfig, ...initTableConfig }),
        [initTableConfig]
    );

    const [columnConfigList, setColumnConfigList] =
        useState<ITableColumnConfig[]>(initColumnConfigList);

    const [isRowCountEnabled, setIsRowCountEnabled] = useState<boolean>(
        defaultTableSettings.isRowCountEnabled
    );

    const injectedColumnConfigList: ITableInjectableColumnConfig[] = useMemo(() => {
        const configList = [] as ITableInjectableColumnConfig[];

        if (isRowCountEnabled) {
            configList.push(rowCountColumnConfig);
        }

        return configList;
    }, [isRowCountEnabled]);

    const fullColumnConfigList = useMemo(() => {
        const fullColumnConfigList = [...columnConfigList];

        injectedColumnConfigList.forEach((injectedColumnConfig) => {
            const { positionInRow } = injectedColumnConfig;

            if (positionInRow == EPositionInRow.First || positionInRow === 0) {
                fullColumnConfigList.unshift(injectedColumnConfig);
            } else if (!isNaN(positionInRow as number) && positionInRow > 0) {
                fullColumnConfigList.splice(positionInRow as number, 0, injectedColumnConfig);
            } else {
                fullColumnConfigList.push(injectedColumnConfig);
            }
        });

        return fullColumnConfigList;
    }, [injectedColumnConfigList, columnConfigList]);

    const [isMultiSortEnabled, setIsMultiSortEnabled] = useState<boolean>(
        defaultTableSettings.isMultiSortEnabled
    );

    const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(
        defaultTableSettings.isSearchEnabled
    );

    return (
        <TableSettingsContext.Provider
            value={{
                // Dynamic Settings:
                columnConfigList: columnConfigList,
                autoGenColumnConfigList: injectedColumnConfigList,
                fullColumnConfigList: fullColumnConfigList,
                isRowCountEnabled,
                isMultiSortEnabled,
                isSearchEnabled,
                // Functions:
                setColumnConfigList,
                setIsRowCountEnabled,
                // Static Settings:
                isMultiSortSettingsEnabled: defaultTableSettings.isMultiSortSettingsEnabled,
                isTableSettingChangeable: defaultTableSettings.isTableSettingChangeable,
            }}
        >
            {children}
        </TableSettingsContext.Provider>
    );
};

export { TableSettingsContext, TableSettingsProvider, rowCountColumnConfig };
