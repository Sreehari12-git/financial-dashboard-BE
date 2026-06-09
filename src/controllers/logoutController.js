export const logoutUser = async(req,res) => {
    try {
        res.clearCookie("token");
        res.clearCookie("refreshToken")
        return res.status(200).json({
            message: "Logged out successfully"
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        })
    }
}

