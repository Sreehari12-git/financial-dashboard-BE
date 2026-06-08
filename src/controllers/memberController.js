import prisma from "../config/prisma";

export const getMemberDetails = async(req,res) => {
    try {
        const memberId = Number(req.params.id);
        const userId = req.user.id;
        const member = await prisma.familyMember.findUnique({
            where: {
                id: memberId,
                userId: userId
            },
            include: {
                assets: true,
                liabilities: true
            }
        })

        if(!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }
        res.json(member);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching member"
        })
    }
}


