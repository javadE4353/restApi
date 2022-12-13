import db from "../model/index.js";
import { responce } from "../util/configResponce.js";
import {Op} from "sequelize"

export const reviewController=new( class ReviewController{

constructor(){}

async addcamment(req,res){

const {username,movieid,movietitle,content,ratings}=req.body;

if (!username && !movietitle && !content) {
    return res.status(400).send("")
}

const user=await db.user.findOne({where:{username:username}})

if (!user) {
    return res.status(400).send("")
}

const newComent=await db.Review.create(req.body)


responce({
    res,
    code:200,
    message:"ok",
    data:newComent
})

}
async getAllcamment(req,res){
const {movieid,movietitle}=req.query
const comment=await db.Review.findAll({where:{[Op.and]:[{movieid:movieid},{movietitle:movietitle}]}})
responce({
    res,
    code:200,
    message:"ok",
    data:comment
})

}

})()