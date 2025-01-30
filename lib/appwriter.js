

import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';


const appWriteConfig = {
    ProjectId : "679b40480024ffa87eac" ,
    paltform: "com.hmn.aora",
    endpoint : "https://cloud.appwrite.io/v1",
    
    //datanase
    dataBaseId : "679b4eff00241ead7348" ,
    usersCollectionId : "679b4f61002bc2a91972" , 
    videosCollectionId : "679b4fef0003f629e73b" ,

    storageId : "679b517d000c0410944b"
}   


const client = new Client()
    // .endpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.ProjectId)
    .setPlatform(appWriteConfig.paltform);

const account = new Account(client);

const avatar = new Avatars(client)


const database = new Databases(client)


//create User 
export const  createUser = async (email, password , username) =>{

    try {

        let uniqueId = ID.unique();
        const newAccount = await account.create(
            //userID 
            uniqueId,
            email,
            password,
            username
        ) ; 

        if(!newAccount) throw new Error

        const avatarUrl = avatar.getInitials(username);


        await SingIn(email,password);
        
        let dataStoredInDatabase = {
            accountId  : newAccount.$id ,
            email,
            username,
            avatar : avatarUrl
        }


        const newUser = database.createDocument(
            appWriteConfig.dataBaseId,
            appWriteConfig.usersCollectionId,
            uniqueId , 
            dataStoredInDatabase
        )

        return newUser ; 
    } catch (error) {
        console.log(error)
        throw new Error
    }

}


export const  SingIn = async (email,password)=>{
    try {
        
        const session = await account.createEmailPasswordSession(email,password)

        return session;

    } catch (error) {
        console.log("sing in error : " , error)
        throw new Error;
    }
}