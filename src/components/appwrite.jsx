import {Client, Databases, ID, Query} from 'appwrite'
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async ( searchTerm, movie) =>{
    // 1. use Appwrite SDK to check if the search Term exists int the database
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm',searchTerm),
        ])
        //2.If exists, update count
        console.log("check if exists "+ result.documents.length);
        if(result.documents.length > 0){
            const doc = result.documents[0];
            console.log(doc.count);
            console.log("increasing count for"+searchTerm);
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count +1,
            })
        }
        else{
            //3. else, create new document with search term and count as 1
            console.log("creating doc for"+searchTerm);
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(),{
                searchTerm,
                count:1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            } );
        }
    }
    catch (error) {
        console.log("Error is"+error);    
    }
    
}

export const getTrendingMovies = async () =>{
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return result.documents;

    } catch (error) {
        console.log(error);
    }
}