// import habitModel from "../models/HabitModel";

// const getBadgefromStrak = (streak)=>{
//     if(streak >= 50) return "gold";
//     if(streak >= 30) return "silver"
//     if(streak >= 10) return "bronze"
//     return "none"
// }

// export const createHabit = async (req, res)=>{
//     try {
//         const {title,
//             description,
//             category,
//             motivation,
//             frequency,
//             targetPerDay,
//             preferredTime,
//             startDate
//         } = req.body;

//         const userId = req.user._id

//         const newHabit = new habitModel({
//             userId,
//             title,
//             descriptjioin,
//             catefory,
//             motivation,
//             frequency,
//             targetPerDay,
//             preferredTime,
//             startDate : startDate || Date.now(),
//         })

//         await new Habit..save();

//     } catch (error) {
        
//     }
// }


// export const updateHabit = async (req,res)=>{
//     const {habitId} = req.params;
//     const updates = req.body;
//     const habit = await habitModel.findOneAndUpdate({
//         _id:habitId, userId : req.user._id
//     }, updates, {new:true})
//     return res.status(200).json({message : "Habit deleted", habit:deletedHabit})
// }

// export const markHabitComplete = async (req, res) =>{
//     try {
//         const {habitId} = req.params;
//         const userId == req.user_id;

//         const habit = await habitModel.findOne({_id: habitId, userId});
//         if(!habit) return res.status(404).json({message ;"Habit not found"})
        
//             const today = new Date.toISOString().split('T')[0];
//     } catch (error) {
        
//     }
// }