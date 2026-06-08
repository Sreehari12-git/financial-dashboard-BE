import prisma from "../config/prisma";

export const createAsset = async(req,res) => {
    try {
        const userId = req.user.id;

        const {assetName,category,purchaseValue,currentValue,annualYield,purchaseDate,familyMemberId} = req.body;

        const member = await prisma.familyMember.findFirst({
            where: {
                id: Number(familyMemberId),
                userId: userId,
            }
        });

        if(!member) {
            return res.status(404).json({
                message: "Family member not found",
            });
        }

        const asset = await prisma.asset.create({
            data: {
                assetName,
                category,
                purchaseValue: Number(purchaseValue),
                currentValue: Number(currentValue),
                annualYield: annualYield ? Number(annualYield) : null,
                purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
                familyMemberId : Number(familyMemberId)
            }
        })

        return res.status(201).json({
                message: "Asset created successfully",
                data: asset,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
            message: "Server error",
            });
        }
}

export const getAsset = async(req,res) => {
    try {
        const userId = req.user.id;

        const assets = await prisma.asset.findMany({
            where: {
                familyMember: {
                    userId: userId
                },
            },
            include: {
                familyMember: {
                    select: {
                        id: true,
                        fullName: true,
                        relation: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return res.status(200).json({
            message: "Assets fetched successfully",
            data: assets,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
        });
    }
}

export const getAssetSummary  = async(req,res) => {
    try {
        const userId = req.user.id;

        const assets = await prisma.asset.findMany({
            where: {
                familyMember: {
                    userId: userId,
                },
            },
            select: {
                category: true,
                currentValue: true,
            }
        })

        const summary = assets.reduce((acc,asset) => {
            const category = asset.category;

            if(!acc[category]) {
                acc[category] = 0;
            }

            acc[category] += asset.currentValue || 0;

            return acc;
        }, {});

        return res.status(200).json({
            message: "Asset summary fetched successfully",
            data: summary
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        })
    }
}


export const getAssetAllocation = async (req, res) => {

    try {
        const userId = req.user.id;

        const groupedAssets = await prisma.asset.groupBy({
            by: ["category"],

            where: {
                familyMember: {
                    userId: userId
                }
            },

            _sum : {
                currentValue: true
            }
        })
        let total = 0;

        groupedAssets.forEach(asset => {
        total += asset._sum.currentValue
        })

        const result = groupedAssets.map(asset => {
        const value = asset._sum.currentValue;

        const percentage = (value / total) * 100;

        return {
            category : asset.category,
            totalValue: value,
            percentage: percentage.toFixed(1)
        }
    })

    res.json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
};


