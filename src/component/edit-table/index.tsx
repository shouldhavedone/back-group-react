import React from 'react';
import { Table } from 'antd';
import { TableProps, ColumnType  } from 'antd/lib/table';
import { GetRowKey, ColumnTitle } from 'antd/lib/table/interface'
import EditableCell from './cell';
import EditableRow, { RowContext, IRowContext as ICRowContext} from './row';
import { IValidOpt } from './valid';

export const EditRowDataContext = RowContext;
export interface IRowContext extends ICRowContext {};

export interface IEditTableProps<T> extends TableProps<T> {
  rowKey: string | GetRowKey<T>;
  editKey: string[];
}

export interface ICellData<T> extends React.HTMLAttributes<HTMLElement> {
  record: T;
  rowKey: React.Key;
  dataindex: number | undefined;
  cellKey: ColumnTitle<T>;
  celltitle: ColumnTitle<T>;
  editable: boolean;
  inputType: string;
  valid?: IValidOpt
}

export interface IRowData<T> extends React.HTMLAttributes<HTMLElement> {
  record: T;
  rowKey: React.Key;
  dataindex: number | undefined;
  rowValids: { valid: IValidOpt, key: React.Key}[];
}

export interface IColumsItem<T> extends ColumnType<T>{
  editable?: boolean;
  inputType?: string;
  valid?: IValidOpt
}



function EditTable<T extends object> (props: IEditTableProps<T>) {
  if(!props.columns) {
    throw new Error('请配置columns');
  }
  
  const rowValids:{ valid: IValidOpt, key: React.Key}[] = [];
  
  const columns = props.columns.map(function(item: IColumsItem<T>){
    if (!item.editable) {
      return item;
    }
    if(item.valid) {
      rowValids.push({
        key: item.key || 'keys',
        valid: item.valid
      })
    }
    return {
      ...item,
      onCell: (record: T, index?: number) => {
        let rowKey: React.Key = 'keys';

        if(typeof props.rowKey === 'function') {
          rowKey = props.rowKey(record, index);
        }else if(props.rowKey) {
          rowKey = props.rowKey;
        }
        if(record[rowKey] === undefined) {
          throw new Error('无关键数据: record[rowKey]');
        }
        
        const cellData:ICellData<T> = {
          record,
          rowKey,
          cellKey: item.key,
          celltitle: item.title,
          inputType: item.inputType || 'input',
          dataindex: index,
          valid: item.valid,
          editable: props.editKey.indexOf(record[rowKey]) !== -1
        }
        return cellData;
      }
    };
  })
  

  return <Table<T>
    {...props}
    columns={columns}
    components={{
      body: {
        cell: EditableCell,
        row: EditableRow
      },
    }}
    
    onRow = {(record: T, index?: number) => {
      let rowKey: React.Key = 'keys';
      if(typeof props.rowKey === 'function') {
        rowKey = props.rowKey(record, index);
      }else if(props.rowKey) {
        rowKey = props.rowKey;
      }
      if(!record[rowKey]) {
        throw new Error('无关键数据: record[rowKey]');
      }
      const rowData: IRowData<T> = {
        record,
        rowKey,
        rowValids,
        dataindex: index,
      }
      return rowData;
    }}
    >

  </Table>
}

export default EditTable;