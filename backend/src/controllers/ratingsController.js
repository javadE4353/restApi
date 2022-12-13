import db from "../model/index.js";
import { responce } from "../util/configResponce.js";
import {Op} from "sequelize"

export const ratingsController=new( class RatingsController{

constructor(){}

async addRatings(req,res){

const {username,movietitle,ratings}=req.body;

if (!username && !movietitle) {
    return res.status(400).send("")
}

const user=await db.user.findOne({where:{username:username}})

if (!user) {
    return res.status(400).send("")
}

const getratings=await db.Ratings.findOne({where:{[Op.and]:[{username:username},{movietitle:movietitle}]}})
let Rating;
if (getratings === null) {
     Rating=await db.Ratings.create(req.body)

}
 Rating=await db.Ratings.update(req.body,{where:{[Op.and]:[{username:username},{movietitle:movietitle}]}})

responce({
    res,
    code:200,
    message:"ok",
    data:Rating
})

}
async getAllRating(req,res){
const {movietitle}=req.query
if (!movietitle) {
    return res.status(400).send("")
}
const ratings=await db.Ratings.findAll({where:{movietitle:movietitle}})

responce({
    res,
    code:200,
    message:"ok",
    data:ratings
})

}

})()