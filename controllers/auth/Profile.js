
const profile = async (req,res)=>{
    if(!reg.user){
        res.status(400).json("not signed in")
    }
    else{
        return res.status(200).json(req.user)
    }
}

module.exports = profile