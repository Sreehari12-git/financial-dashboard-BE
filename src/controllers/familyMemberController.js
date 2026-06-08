import prisma from "../config/prisma";

export const getFamilyMembers = async(req,res) => {
    try {
        const userId = req.user.id;

        if(!userId) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        const familyMembers = await prisma.familyMember.findMany({
            where: {
                userId: userId
            }
        })

        return res.status(200).json({
            message: "Family members fetched successfully",
            data: familyMembers
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
}


export const getFamilyMemberById = async(req,res) => {
    try{
        const userId = req.user.id;
        const {id} = req.params;

        if(!id) {
            res.status(400).json({
                message: "Family member id is required"
            })
        }

        const member = await prisma.familyMember.findFirst({
            where: {
                id: Number(id),
                userId:userId
            }
        })

        if(!member) {
            res.status(404).json({
                message: "Family member not found"
            })
        }

        return res.status(200).json({
            message: "Family member fetched successfully",
            data: member
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json ({
            message: "Server error"
        })
    }
}

export const createFamilyMember = async(req,res) =>{
    try {
       const {fullName,relation,age,occupation,annualIncome,relatedToId} = req.body; 

       const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            res.status(400).json({
                message: "User does not exist"
            })
        }

        if(relatedToId) {
            const parentMember = await prisma.familyMember.findUnique({
                where: {
                    id: relatedToId
                }
            })

            if(!parentMember) {
                return res.status(400).json({
                    message: "Parent family remember not found"
                })
            }

            const newMember = await prisma.familyMember.create({
                data: {
                    fullName,
                    relation,
                    age: age? Number(age):null,
                    occupation,
                    annualIncome,
                    relatedToId,
                    userId
                }
            })

            return res.status(201).json({
                message: "Family created successfully",
                data: newMember
            });
         } 
    } catch(error) {
        console.log(error);
        return res.status(500),json({
            message: "Server errror"
        })
    }
}

