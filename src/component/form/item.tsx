import React, { ReactElement } from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { Rule } from 'antd/lib/form';

export interface IFormItemProps {
  name?: string;
  view?: boolean;
  label?: string;
  hidden?: boolean;
  rules?: Rule[];
  children: ReactElement[] | ReactElement;
  props?: FormItemProps;
}

const FormItem: React.FC<IFormItemProps> = function({name, hidden = false, label, rules=[], view = false, props = {}, children}) {
  const childElm = [FormItemView, FormItemInput];
  const viewKey = view ? 0 : 1;
  const itemProps = {
    label, rules, hidden,
    ...props
  }
  if(!view) itemProps.name = name;

  return <Form.Item  {...itemProps}>
    {
      React.Children.toArray(children).filter((child:any) => {
        return child.type === childElm[viewKey];
      })[0] || children
    }
  </Form.Item>
}

export default FormItem;

export interface IFormItemChildProps {
  children: ReactElement;
  onChange?: Function;
  value?: string;
}


export const FormItemView: React.FC<IFormItemChildProps> = function(props) {
  return props.children;
}

export const FormItemInput: React.FC<IFormItemChildProps> = function({children, onChange, value}) {
  return React.cloneElement(children, {onChange, value});
}