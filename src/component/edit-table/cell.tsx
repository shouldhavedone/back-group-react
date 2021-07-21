import React, {useContext} from 'react';
import { Input } from 'antd';
import {RowContext} from './row';
import {checkValue} from './valid';

export interface IEditableCellProps<T> {
  editable: boolean;
  record: T;
  rowKey: string;
  cellKey: string;
  inputType: string;
  valid?: {
    required?: boolean;
  }
}

export interface IEditItemProps<T> {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const EditItem = {
  'input': EditInput
}

function EditableCell<T>({children, editable, valid, record, rowKey, cellKey, inputType, ...restProps}: React.PropsWithChildren<IEditableCellProps<T>>) {
  const context = useContext(RowContext);
  if(!editable) {
    return <td {...restProps}>{children}</td>
  }
  const errorMessage = context.isFirst || checkValue(context.data[cellKey], valid);
  
  const Item: React.FC<IEditItemProps<T>> = EditItem[inputType] || EditInput;
  return <td  {...restProps}>
      <Item value={context.data[cellKey]} onChange={(e)=>{
        context.data = {...context.data, [cellKey]: e.currentTarget.value};
      }}/>
      {  errorMessage && <div>{errorMessage}</div>}
    </td>
  
}

function EditInput<T>({value, onChange}: IEditItemProps<T>) {
  return <Input value={value} onChange={onChange}/>
}





export default EditableCell;