export default (posts = [], action) => {

    switch(action.type){
        case 'UPDATE':
            // checks if the post id matched the action payload id, 
            // if it does return the action payload, else return the original post
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
            
        case 'FETCH_ALL':
            return action.payload;
        
        case 'CREATE':
            return posts;
        
        default:
            return posts;
    }

}