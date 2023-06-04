import { useEffect, useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, useRowSelect } from 'react-table'
import styles from './Table.module.scss'
import ColumnFilter from "./ColumnFilter";
import { Checkbox } from "./Checkbox";
import { GlobalFilter } from "./GlobalFilter";
import EditableCell from "./EditableCell";

export default function TableUI(props) {
    const { headers_data, rows_data, children, set_selected_rows, set_visible_rows, editable, changeable, dependencies } = props

    const dependency_list = []
    if (changeable) {
        dependency_list.push(rows_data)
        if (dependencies) {
            dependency_list.push(...dependencies)
        }
    }
    const columns = useMemo(() => headers_data, [])
    const data = useMemo(() => rows_data, dependency_list)

    const defaultColumn = useMemo(() => {
        const columns = { Filter: ColumnFilter }
        if (editable) {
            columns.Cell = EditableCell
        }
        return columns
    })

    const use_table_objects = {
        columns,
        data,
        defaultColumn,
    }

    if (editable && 'update_data' in props) {
        use_table_objects.update_data = props.update_data
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        state,
        setGlobalFilter,
        selectedFlatRows
    } = useTable(
        use_table_objects,
        useFilters,
        useGlobalFilter,
        useSortBy,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => {
                            return <Checkbox {...getToggleAllRowsSelectedProps()} />
                        },
                        Cell: ({ row }) => {
                            return <Checkbox {...row.getToggleRowSelectedProps()} />
                        }
                    },
                    ...columns
                ]
            })
        }
    )

    const { globalFilter } = state

    useEffect(() => {
        set_selected_rows([...selectedFlatRows.map(i => i.original)])
    }, [selectedFlatRows])


    useEffect(() => {
        set_visible_rows(rows.map(i => i.original))
    }, [rows])
    return (
        <>
            <div className={styles.table}>
                <div className={styles.filters}>
                    {children}
                    <GlobalFilter filter={globalFilter} set_filter={setGlobalFilter} />
                </div>

                <div className={styles.table_container}>
                    <table {...getTableProps} >

                        <thead>
                            {
                                headerGroups.map((header_group, index) => {

                                    return (
                                        <tr key={index} {...header_group.getHeaderGroupProps}>
                                            {
                                                header_group.headers.map((column, index) => {
                                                    return (
                                                        <th {...column.getHeaderProps()} key={index} style={{fontWeight: '550'}}>
                                                            <span {...column.getSortByToggleProps()}>
                                                                {column.render('Header')}
                                                                &nbsp;&nbsp;
                                                                {column.isSorted ? (column.isSortedDesc ? '⬆️' : '⬇️') : ''}
                                                            </span>
                                                            <div>
                                                                {
                                                                    column.canFilter ? column.render('Filter') : null
                                                                }
                                                            </div>
                                                        </th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </thead>

                        <tbody {...getTableBodyProps}>
                            {
                                rows.map((row, index) => {
                                    prepareRow(row)
                                    return (
                                        <tr key={index} {...row.getRowProps()}>
                                            {
                                                row.cells.map((cell, index) => {
                                                    return (
                                                        <td key={index} {...cell.getCellProps()}>
                                                            {cell.render('Cell')}
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>

            </div>


        </>
    )
}
