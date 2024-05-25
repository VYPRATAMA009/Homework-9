import bcrypt from 'bcrypt';
import prisma from '../db/database.js';

const auth = async (req, res, next) => {
    const { email, password } = req.headers;
    if (!email || !password) return res.status(400).json({
        message: "Login required"
    });
    try {
        const data = await prisma.users.findFirst({
            where: {
                email: email
            }
        });
        if(!data) return res.status(400).json({message:"Invalid credential"});
        if(!password || !bcrypt.compare(password, data.password)) 
            return res.status(400).json({
            message: "Invalid credentials"
        });
        req.data = data;
        next();
    } catch (error) {
        next(error)
    }
}

export default auth;
