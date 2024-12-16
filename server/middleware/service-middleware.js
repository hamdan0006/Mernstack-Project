const Service = require("../models/service-models");

// const services = async (req, res) => {
//     try {
//         const response = await Service.findOne();
//         if (!response) {
//             return res.status(404).json({ msg: "Could not find data" });
//         }
//         return res.status(200).json({ msg: "Got the data", data: response });
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// };

// module.exports = services;

// chat gpt code 

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response || response.length === 0) {
            return res.status(404).json({ msg: "Could not find data" });
        }
        return res.status(200).json({ msg: "Got the data", data: response });
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports =services;
