const prisma = require("../../config");

module.exports.getUser = async (req, res)=>{
    const data = await prisma.user.findMany({
        // omit: {
        //     password: false,
        // },
        include: {
            Order: true,
        },
    });
    res.json({
        data,
    });
}