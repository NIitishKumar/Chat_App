import conversationModel from "../models/conversation.model";
import Message from "../models/message.model";

export const sendMessage = async (req, res) => {
    try {
        const {message } = req.body;
        const {id: receiverId} = req.params
        const senderId = req.user._id

        let conversation = await conversationModel.findOne({
            participants: {$all: [senderId, receiverId]}
        });

        if(!conversation){
            conversation.create({
                participants : [receiverId, senderId]
            })
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage){
            conversation.messages.push(newMessage);
        }
        await Promise.all[newMessage.save(), conversation.save()];
        res.status(201).json(newMessage)

        res.send("Message received")
    } catch (error) {
        res.status(500).json({erroe:"Internal server error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.body;
        const senderId = req.user._id
        
        const conversation = await conversationModel.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([ ])

        res.status(200).json(conversation.messages)

    } catch (error) {
        res.status(500).json({erroe:"Internal server error"})
    }
} 