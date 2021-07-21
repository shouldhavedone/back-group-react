import React, { useState } from 'react';
import { IValidOpt, checkValue } from './valid';

export interface IRowContext {
  data?: any,
  isFirst?: boolean,
  check?: ()=>boolean
}

export const RowContext:React.Context<IRowContext> = React.createContext({});

function EditableRow<T>(props: React.PropsWithChildren<{record:T, rowValids: { valid: IValidOpt, key: React.Key}[]}>) {
  const [rowData, setRowData] = useState(props.record);
  const [isFirst, setIsFirst] = useState(true);
  const context = {
    get data() {
      return rowData;
    },
    set data(value) {
      setIsFirst(false);
      setRowData(value);
    },
    get isFirst() {
      return isFirst;
    },
    check() {
      const valids = props.rowValids.map(function(item) {
        return (typeof checkValue(rowData[item.key], item.valid)) === 'boolean';
      });
      setIsFirst(false);
      return valids.indexOf(false) === -1;
    }
  }
  return <RowContext.Provider value={context}>
    <tr >{props.children}</tr>
  </RowContext.Provider>
}

export default EditableRow;