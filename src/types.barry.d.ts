/* 传值方法 例如用于load方法  */
export type PassValueFunction<T,I>=(data:T,index?:I)=>void;
/* 表格的update del edit等操作的行为 */
export type TableAction<D,T>=(data:D, type:T)=>void;
/* 表格的重渲染方法 */
export type TableReRender<T>=(type:T)=>void;
/* 字符串或未定义类型 */
export type StringOrNot=string|undefined;
/* 字符串或不可用类型 */
export type StringOrNull=string|null;
