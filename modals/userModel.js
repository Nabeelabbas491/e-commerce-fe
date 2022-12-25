const mongoose = require("mongoose");

/* user */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim:true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      unique:true
    },
    phone: {
      trim:true,
      type: String,
    },
    avatar:{
      type:String
    },
    address:{
      trim:true,
      type:String
    },
    // city:{
    //   type : mongoose.Types.ObjectId,
    //   ref : ""                        // modal name 
    // },
    // country:{
    //   type : mongoose.Types.ObjectId,
    //   ref : ""
    // },
    // in case you need to store more than one Object ID , like array , then use following syntax , 
    // favourates:[
    //   {
    //     type : mongoose.Types.ObjectId,
    //     ref : ""
    //   }
    // ],
    postalCode:{
      type:Number
    },
    token: {
      type: String,
    },
    isActive :{
      type:Boolean,
      default:true
    }
    // define role , enum define values either it would accept admin or user , better is use joi validation valid method and provide allowed values inside that method 
    // role: {
    //   type: String,
    //   enum: ["admin", "user"],
    //   default: "user",
    // },
  },
  {
    timestamps: true,                 
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);


// userSchema.pre("save", async function (next) {         
//   console.log("save...")
// //  // check the password if it is modified
// //   if (!this.isModified("password")) {
// //     return next(); 
// //   } 
// //   // Hashing the password
// //   this.password = await bcrypt.hash(this.password, 12);
// //   // Delete passwordConfirm field
// //   next();
// });


// userSchema.methods.validPassword = async function (password) {
//   try{
//     console.log("YES !!")
//     // return await bcrypt.compare(password,this.password) 
//   }catch(e){
//     throw e
//   }
// }

const User = mongoose.model("User", userSchema);

// sometimes unique doesnt work there is plenty reasons for that 
// if tehre is already duplicate data in mongo db first delete that 
// must write init , For uniqueness to be ensured, mongo needs to create its index. Make sure that before you create any users, its index is already created.
User.init().then(() => {
  // safe to create users now.
});

module.exports = { User };