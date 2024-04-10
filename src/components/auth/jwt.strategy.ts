import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {PassportStrategy} from '@nestjs/passport'
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { USER_MODEL, UserDocument } from "src/Schema/auth/auth.schema";




@Injectable()
export class JwtSTrategy extends PassportStrategy(Strategy){
    constructor(
     @InjectModel(USER_MODEL)
     private readonly  userModel:Model<UserDocument>
    ){
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             secretOrKey:process.env.JWT_SECRET
        })
    }

    async validate(payload){
        const {id}=payload;

        const user=await this.userModel.findById(id)
        if(!user){
            throw new UnauthorizedException('Login first to access this endpoint.')
        }
        return user
    }
   
}