export interface IValidOpt {
  required?: boolean
}

const checkValueFn = {
  'required': {
    message: '请输入参数',
    valid: (value: string, opt: boolean)=>{
      if(!opt) return true;
      if(value === '' || value === undefined || value === null) {
        return false;
      }
      return true;
    }
  }
}

export function checkValue(value: string, valid = {}): boolean | string {
  for(let key in valid) {
    if(!checkValueFn[key]) throw new Error('未实现验证方法:' + key);
    const isValid = checkValueFn[key].valid(value, valid[key]);
    if(!isValid) return checkValueFn[key].message;
  }
  return true;
}