import { User } from "./user";

export class userParams{
    minAge:number = 18;
    maxAge:number = 99;
    gender:string;
    pageNumber:number = 1;
    pageSize:number = 5;
    orderBy:string = 'lastActive'

    constructor(user:User){
        this.gender = user.gender === 'female' ? 'male' : 'female'
    }
}

