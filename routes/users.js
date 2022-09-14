const router = require('express').Router()
const User = require("../models/user")

router.put("/:id",async(req,res) => {
 if(req.body.userId === req.params.id || req.body.isAdmin) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id,{
      $set: req.body
    })  
    res.status(200).json("Update Your INFO")
  }catch(err) {
    return res.status(500).json(err)
  }
 } else {
   return res.status(403).json('you can only yourSelf Status LOGIN!!')
 }
})

router.delete("/:id",async(req,res) => {
 if(req.body.userId === req.params.id || req.body.isAdmin) {
  try {
    const user = await User.findByIdAndDelete(req.params.id)  
    res.status(200).json("Delete your INFO")
  }catch(err) {
    return res.status(500).json(err)
  }
 } else {
   return res.status(403).json('you can only yourSelf Status DELETE!!')
 }
})

router.get("/:id",async(req,res) => {
  try {
    const user = await User.findById(req.params.id)  
    const {password,updatedAt,...other} = user._doc
    res.status(200).json(other) 
  }catch(err) {
    return res.status(500).json(err)
  } 
})

router.put("/:id/follow", async(req,res) => {
    if (req.body.userId !== req.params.id) {
    try{
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)
        if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({
                $push: {
                    followers:req.body.userId
                }
            })
            await currentUser.updateOne({
                $push: {
                    followings:req.params.id
                }
            })
            return res.status(200).json("success follow")
        } else {
            return res.status(403).json("you already follow this yours")
        }

    } catch(err){
      return res.status(500).json(err)
     }
    }else{
        return res.status(500).json('you can not follow myself')
    }
})

router.put("/:id/unfollow", async(req,res) => {
    if (req.body.userId !== req.params.id) {
    try{
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)
        if (user.followers.includes(req.body.userId)) {
            await user.updateOne({
                $pull: {
                    followers:req.body.userId
                }
            })
            await currentUser.updateOne({
                $pull: {
                    followings:req.params.id
                }
            })
            return res.status(200).json("delete follow")
        } else {
            return res.status(403).json("you dont delete follow")
        }

    } catch(err){
      return res.status(500).json(err)
     }
    }else{
        return res.status(500).json('you can not delete follow myself')
    }
})



module.exports = router  
