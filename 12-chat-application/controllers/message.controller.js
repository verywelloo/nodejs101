const User = require('../models/user.model');
const Message = require('../models/message.model');

const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password'); // $ne : not equal to

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log('Error in getUserForSidebar: ', error.message);
    res.status(500).json({ error: 'Internal server error' }); // why error ?
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
        $or:[ // $or = or condition
            {senderId: myId, receiverId:userToChatId},
            {senderId:userToChatId, receiverId: myId}
        ]
    });

    res.status(200).json(message);
  } catch (error) {
    console.log('Error in getMessage controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sendMessage = async (req,res) => {
try {
  const {text, image} = req.body // image that send by user
  const {id: receiverId} = req.params
  const senderId = req.user._id

  let imageUrl;
  if (image) {
    // upload base64 image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image)
    imageUrl = uploadResponse.secure_url
  }

  const newMessage =  new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  })

  await newMessage.save()

  // socket.io

  res.status(201).json(newMessage)
  res.status().json()
} catch (error) {
  console.log("Error in sendMessage controller: ", error.message)
  res.status(500).json({error: "Internal server error"})
}
}

module.exports = {
  getUserForSideBar,
  getMessages,
};
