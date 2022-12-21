
import {
  REQUESCATEGORY,
  GETCATEGORY,
  INSERTCATEGORY,
  UPDATECATEGORY,
  DELETECATEGORY,
  FAILCATEGORY,

} from "../types/types";

interface Cat{
  name:string,
  bits:number,
  image:string,
  content:string 
}
interface REQUEST {
  type: "REQUESCATEGORY";
}
interface getcategory {
  type: "GETCATEGORY";
  payload: {categorys:Cat[]};
}
interface insertcategory {
  type: "INSERTCATEGORY";
  payload: {insert:number};
}
interface updatecategory {
  type: "UPDATECATEGORY";
  payload: {update:number};
}
interface deletecategory {
  type: "DELETECATEGORY";
  payload: {delete:number};
}
interface failcategory {
  type: "FAILCATEGORY";
  payload: {ErrorMassege:string | null};
}

export type Action = updatecategory | deletecategory | failcategory | insertcategory | getcategory | REQUEST;
