import prisma from "../config/prisma";

export const getFamilyTree = async (req, res) => {

  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  const members = await prisma.familyMember.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      fullName: true,
      relation: true,
      relatedToId: true
    }
  });

   const selfMember = members.find(m => m.relation === 'self');
   
  const buildTree = (parentId = null) => {
    return members.filter(member => member.relatedToId === parentId).map(member => ({
      id:member.id,
      user: member.fullName,
      relation: member.relation,
      familyMember: buildTree(member.id)
    }))
  }

  const familyTree = {
    id: selfMember?.id,
    user: user.fullName,
    userId: user.id,
    familyMember: selfMember ? buildTree(selfMember.id) : []
  };

  res.json(familyTree);
};

  