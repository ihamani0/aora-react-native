

import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';


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

const {
    ProjectId  ,
    paltform ,
    //datanase
    dataBaseId ,
    usersCollectionId, 
    videosCollectionId ,
    storageId } = appWriteConfig;


const client = new Client()
    // .endpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.ProjectId)
    .setPlatform(appWriteConfig.paltform);

const account = new Account(client);

const avatar = new Avatars(client)


const database = new Databases(client)

const storage = new Storage(client)


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
        console.log(error.message)
        throw new Error
    }

}


export const  SingIn = async (email,password)=>{
    try {
        
        const session = await account.createEmailPasswordSession(email,password)

        return session;  // ✅ Returns the created session

    } catch (error) {
        console.log("sing in error : " , error.message)
        throw new Error;
    }
}




//get current account 

export const getCurrentUser = async ()=>{
    try {
        
        const CurrentAccount = await account.get();

        if(!CurrentAccount) throw new Error("User is not authenticated");

        //get the user based on the account Id 
        const currentUser = await database.listDocuments(
            appWriteConfig.dataBaseId,
            appWriteConfig.usersCollectionId,
            [Query.equal('accountId' , CurrentAccount.$id )]
        );


        
        if (!currentUser || !currentUser.documents.length ) throw new Error("User not found");

        
        return currentUser.documents[0]

    } catch (error) {
        console.log("Error From Appwrite:", error.message);
        return null;  // Return null instead of crashing
    }
}


export const singOut = async ()=>{

    try {
        
        const session = await account.deleteSession('current');
        
        return session;
    } catch (error) {
        console.log("from sing Out" ,error.message);
    }
}




export const getAllPost = async ()=>{

    try {
        const post = await database.listDocuments(
            dataBaseId , 
            videosCollectionId
        )

        if(!post) throw new Error("No Posts found");

        return post.documents;
    } catch (error) {
        console.log("from getAllPosts" ,error.message);
    }
}

export const getLatestPosts = async ()=>{

    try {
        const post = await database.listDocuments(
            dataBaseId , 
            videosCollectionId,
            [Query.orderDesc("$createdAt") , Query.limit(7)]
        )

        if(!post) throw new Error("No Latest Posts found");

        return post.documents;
    } catch (error) {
        console.log("from getLatestPosts" ,error.message);
    }
}


export const getSearchPost = async (query)=>{

    try {
        const post = await database.listDocuments(
            dataBaseId , 
            videosCollectionId,
            [Query.search('title',query)]
        )

        if(!post) throw new Error("No Search Posts found");

        return post.documents;
    } catch (error) {
        console.log("from getSearchPost" ,error.message);
    }
}


//get the videos post tha belong to the user
export const getUserPost = async (userId)=>{

    try {
        const post = await database.listDocuments(
            dataBaseId , 
            videosCollectionId,
            [Query.equal('creator',userId)]
        )

        if(!post) throw new Error("No User Posts found");

        return post.documents;
    } catch (error) {
        console.log("from getUserPost" ,error.message);
    }
}



//the firs is upload the video to storage return id Storage and give him to getFilePreview function  to preview the url 
// 1- upload Posts

const uploadFile = async (file , type) => {
    if(!file) return ;

    

    try{

        
        //name , type , size , uri 
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            {
                name : file.fileName, 
                type : file.mimeType , 
                size : file.fileSize , 
                uri : file.uri
            }
        ); 



        console.log('uploadedFile' , uploadedFile)

        const fileUrl =  getFilePreview(uploadedFile.$id , type)
        
        return fileUrl;

    }catch(error){
        console.log("from uploadFile" ,error.message);
    }
}

//
//2 -Previwe Posts
const getFilePreview = async (fileId , type)=>{

    try {
        if(type==='image'){

            return storage.getFilePreview(storageId ,  fileId , 2000 , 2000 , 'top' , 100)
    
        }else if(type==='video'){
            return storage.getFileView(storageId , fileId)
        }else{
            throw new Error('getFilePreview : New Type Found !!')
        }
    } catch (error) {
        throw new Error('getFilePreview  :',error.message)
    }

}

// 3 - create Posts
export const createVideo = async (form) =>{
    try {
        
        const [thumbnailUrl , videoUrl ] = await Promise.all([
            //work with the same time or the finish in same time because we need both at same time 
            uploadFile(form.thumbnail ,'image'),
            uploadFile(form.video , 'video'),
        ])

        const newPost = await database.createDocument(
            dataBaseId,
            videosCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }

        );

        return newPost;
    } catch (error) {
        console.log("from createVideo" ,error.message);
    }
}