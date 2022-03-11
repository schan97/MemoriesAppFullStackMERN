import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        // checks if the token is our own token
        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.TOKEN_SECRET);

            req.userId = decodedData?.id;
        }
        // else it would be a google token
        else{
            decodedData = jwt.decode(token);

            //.sub is Google's unique identifier for every user
            req.userId = decodedData?.sub;
        }

        next();
    }
    catch(error){
        console.log(error);
    }
}

export default auth;