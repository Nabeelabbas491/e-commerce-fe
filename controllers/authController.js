const { User } = require("../modals/userModel");

exports.register = async (req,res,next) => {

    console.log("req of body", req.body)


    const user = await User.create(req.body)


     console.log("user...", user)

     res.status(200).send(user)

     res.status(200).json({
        status: "success",
        // token,
        data: {
          user,
        },
      });

}