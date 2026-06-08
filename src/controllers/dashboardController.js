import prisma from "../config/prisma";

export const getDashboardOverview = async(req,res) => {
    try {
        const userId = req.user.id;

        const assets = await prisma.asset.findMany({
            where: {
                familyMember: {
                    userId: userId
                }
            }
        })

        const totalAssets = assets.reduce((sum,item) => {
            return sum + (item.currentValue || 0);
        },0)

        const members = await prisma.familyMember.findMany({
            where: {userId}
        })

        const totalIncome = members.reduce((sum,item) => {
            return sum + (item.annualIncome || 0);
        },0)

        const liabilities = await prisma.liability.findMany({
            where: {
                familyMember: {
                userId: userId
                }
            }
        });

        const totalLiabilities = liabilities.reduce((sum,item) => {
            return sum + (item.remainingAmount || 0);
        },0)

        const netWorth = totalAssets  - totalLiabilities;

        return res.status(200).json({
            message: "Dashboard overview fetched successfully",
            data: {
                totalAssets,
                totalIncome,
                totalLiabilities,
                netWorth
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

