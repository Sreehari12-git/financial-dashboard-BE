import prisma from "../config/prisma";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const loginUser = async(req,res) => {

    try {
        const {email,password} = req.body;


        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "10d"
            }
        );

        res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            maxAge: 10 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email
            }
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const registerUser = async(req,res) => {
    try {
    const { fullName, email, password, occupation } = req.body;
    const age = parseInt(req.body.age);
    const annualIncome = parseFloat(req.body.annualIncome);

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(existingUser) {
        return res.status(400).json({
            message: "User already exists",
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            fullName,
            email,
            password: hashedPassword
        }
    })
    await prisma.familyMember.create({
        data: {
            fullName,
            relation: "self",
            age,
            occupation,
            annualIncome,
            relatedToId: null,
            userId: user.id
        }
    })

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
        },
    })
   } catch(error) {
    console.log(error); 
    res.status(500).json({ message: "Server error" })
}
}

