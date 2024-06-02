import conversationModel from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const {message, senderId } = req.body;
        const {id: receiverId} = req.params
        // const senderId = req.user._id

        let  conversation = await conversationModel.findOne({
            participants: { $all: [req.body.senderId, req.body.receiverId] }
          });
          

        if(!conversation){
            conversation  = await conversationModel.create({
                participants : [req.body.senderId, req.body.receiverId]
            })
        };

        const newMessage = new Message({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            message
        })

        if (newMessage){
            conversation.messages.push(newMessage);
        }
        await Promise.all[newMessage.save(), conversation.save()];

        const receiverSocketId = getReceiverSocketId(req.body.receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        return res.status(201).json(newMessage)
    } catch (error) {
        console.log(error, "-----------from  send message")
        res.status(500).json({erroe:"Internal server error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        // const {id: userToChatId} = req.body;
        // const senderId = req.user._id
        
        const conversation = await conversationModel.findOne({
            participants: {$all: [req.params.id, JSON.parse(req.query.id)]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([ ])

        res.status(200).json(conversation.messages)

    } catch (error) {
        console.log(error);
        res.status(500).json({erroe:"Internal server error"})
    }
} 