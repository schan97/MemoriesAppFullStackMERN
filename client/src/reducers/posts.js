export default (posts = [], action) => {

    switch(action.type){
        case 'DELETE':
            // return all the posts that don't include the one we just deleted 
            return posts.filter((post) => post._id !== action.payload)
        case 'UPDATE':
        case 'LIKE':
            // checks if the post id matched the action payload id, 
            // if it does return the action payload, else return the original post
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
            
        case 'FETCH_ALL':
            return action.payload;
        
        case 'CREATE':
            return [...posts, action.payload];
        
        default:
            return posts;
    }

}