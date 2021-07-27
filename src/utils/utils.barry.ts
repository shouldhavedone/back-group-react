import React from "react";

/**
 * 从数组中去掉某一个数据
 * @param array
 * @param data
 */
export function kickOut<T>(array:T[],data:T):void{
    if(array.indexOf(data)>=0){
        array.splice(array.indexOf(data),1);
    }
}

/**
 * state惰性初始化函数
 * [函数式的语义化表达]
 * @param value
 */
export function lazyInit<T>(value:T){
    return ()=>value;
}

/**
 * 节点插入算法
 * @param list      数组
 * @param data      数据
 * @param position  插入位置 [从0开始]
 */
export function insertNode<T>(list:T[],data:T,position:number):void{
    if (position===list.length || !list.length) {
        /*
            尾插法
         */
        list.push(data);
    }else{
        /*
            中间插入
            将data插入position位 原数据依次向后移一位
         */
        list.push(list[list.length-1]);     //数组增加一位 并将原来的最后一位移入
        let tmp=list[position];
        for(let i=position;i<list.length;i++){
            if(position===i){
                list[i]=data;
            }else if(i>position){
                const next=list[i];
                list[i]=tmp;
                tmp=next;
            }
        }
    }
}

/**
 * 控制器封装方法
 * 例如：
 *      Popup向外抛出open、close方法
 *      接收层收到控制器后需要对其方法进行封装处理 再向外层抛出对应的方法
 *      如接收层抛出：load(data){
 *          处理data...;
 *          open();
 *      }
 * @param fn
 * @param extraFn
 */
export function handleControllerFn<Controller>(fn:Function,extraFn?:Function){
    return function (ctrl:Controller){
        extraFn && extraFn(ctrl);
        fn(ctrl);
    }
}

/**
 * 阻止冒泡事件
 * */
export function stopPropagation(e:React.MouseEvent){
    e.stopPropagation();
}

/**
 * 下拉框的搜索选择函数
 * @param input
 * @param option
 * @param valueFn
 */
export function filterOptions(input:string, option:any,valueFn?:(option:any)=>string){
    const value=valueFn?valueFn(option):option.children;
    return value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

/**
 * 单纯的空函数
 * @constructor
 */
export function voidFn(){}

/**
 * 将表和字段关联起来
 * 采用'.'连接的方式
 * 无table时直接返回field
 * @constructor
 */
export function relateTableAndField(table:string,field:string){
    return table?table+'.'+field:field;
}

/**
 * 根据字段去获取其所属表
 * 采用截取'.'前面部分的方式
 * @param fieldName
 */
export function getTableByField(fieldName:string|undefined){
    return (fieldName||'').split('.')[0];
}

/**
 * 取出字段的表前缀
 * 采用截取'.'后面的方式
 * @param fieldName
 */
export function getFieldWithoutTable(fieldName:string|undefined){
    return (fieldName||'').split('.')[1];
}

export function arrayFieldsConvert<T>(data:T[],mapFields:{[index:string]:string},notCovertFields?:string[]){
    const output:any[]=[];
    data.forEach(el=>{
        const tmp={};
        for(let key of notCovertFields||[]){
            tmp[key]=el[key];
        }
        for(let key of Object.keys(mapFields)){
            tmp[key]=el[mapFields[key]];
        }
        output.push(tmp);
    });
    return output;
}

/**
 * 快速排序算法
 * @param data
 * @param orderKey
 * @param startPos
 * @param endPos
 */
export function fastOrder<T,K extends keyof T>(data:T[],orderKey:K,startPos?:number,endPos?:number){
    //处理结束位置 和 开始位置
    startPos=startPos||0;
    endPos=endPos!==undefined ? endPos:(data.length-1);
    //位置不满足条件 则直接返回
    if(startPos>=endPos || !orderKey) return;
    let i=startPos,j=endPos,index:number=startPos;
    const point=data[startPos];
    while(j>i){
        //指针从后往前走
        while(data[j][orderKey]>point[orderKey] && j>i){
            j--;
        }
        //找到对应位置
        if(j>i){
            data[index]=data[j];
            index=j;
        }
        //指针从前往后走
        while(data[i][orderKey]<point[orderKey] && i<j){
            i++;
        }
        //找到对应位置
        if(i<j){
            data[index]=data[i];
            index=i;
        }
    }
    //最后在i=j的位置结束循环
    data[i]=point;
    //前半部分继续排序
    fastOrder(data,orderKey,0,i-1);
    //后半部分继续排序
    fastOrder(data,orderKey,i+1,endPos);
}

/**
 * [forOf]对象进行值遍历
 */
interface DataType{
    [props:string]:any;
    [key:number]:any;
}
interface IterableDataType extends DataType{
    [Symbol.iterator]:any;
}
export function Iterable(data: DataType,withKey=false):IterableDataType{
    (data as IterableDataType)[Symbol.iterator]=function (){
        const keys=Object.keys(data);
        let i=0;
        return {
            next(){
                const key=keys[i++];
                return {
                    value:withKey ? {key,value:data[key]} :data[key],
                    done:!key
                }
            }
        }
    }
    return data as IterableDataType;
}
