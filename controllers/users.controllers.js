import prisma from "../db/database.js";
import bcrypt from "bcrypt";

class Users {
    static async getAll(req, res){
        try{
            const data = await prisma.users.findMany();
            res.status(200).json({
                message : "Data Successfully being presented",
                data
            });
        } 
        catch (error) {
            console.log(error);
            res.status(500).json ({
                message : "Internal sever error"
            });
        }
    }

    static async getpagi(req, res){
        try{
            const {page} = req.query;
            const limit = 10;
            const skip = (page-1)*limit;

            const data = await prisma.users.findMany({
                skip: skip,
                take: limit
            });
            res.status(200).json({
                message : `Data Successfuly Presented on page ${page}`,
                data: data
            });
        } 
        catch (error) {
            console.log(error);
            res.status(500).json ({
                message : "Internal sever error"
            });
        }
    }

    static async register (req,res){
       try {
        const { email, gender, password, role } = req. body;
        const hashPassword = bcrypt.hashSync(password, 10);
        const existingUser = await prisma.users.findFirst({
            where: {
                email: email
            }
        });
        if(!email|| !gender|| !password|| !role) 
            return res.status(400).json({
            message : "invalid input"
        });

        if(existingUser) 
            return res.status(400).json({
            message :"Email already used" 
        });
        const registerUser = await prisma.users.create({
            data: {
                email: email,
                gender: gender,
                password:  hashPassword,
                role: role,
            }
        });
        res.status(200).json({
            message : "Register Success",
            data:      registerUser 
        });
       } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error"
            });
       }

    }
    static async login (req,res) {
        const {email, password} = req.body;
        const data = await prisma.users.findFirst({
            where :{
                email: email
            }
        });
        res.status(200).json({
            message: "Login Success"
        });
    }

    static async put (req,res){
        try {
            const {id} = req.params;
            const {email, gender, password, role} = req.body;
            const hashPassword = bcrypt.hashSync(password, 10);
            if ( !id ) return res.status(404).json ({
                message: "Data User Not Found"
            });
            if(!email || !gender || !password || !role) return res.status(400).json({
                message: "Invalid input"
            });
            const editUser = await prisma.users.update({
            where: {
                id: parseInt(id)
            }, data: {
                email: email,
                gender: gender,
                password: hashPassword,
                role: role
            }
            });
            res.status(200).json({
                message: "Data User Successfully Updated",
                data: editUser
            }) 
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async delete (req, res){
        try {
            const {id} = req. params
            if(!id) return res.status(404).json({
                message: "Data User Not Found"
            });
            const deleteUser = await prisma.users.delete({
                where:{ 
                id: parseInt(id)
                }
            });
            res.status(200).json({
                message: "Data User Successfully Deleted",
                deleteUser
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })

        }
    }

}

export default Users;