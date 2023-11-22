const AgePopulation = require('../models/agepopulation')

const agePopsController = {
    getAgePops: async (req, res) => {
        try {
            const agePops = await AgePopulation.find({});
            res.data.json({
                agePops: agePops,
                user: req.rootUser,
                message: "Hello from agepopscontroller.js"
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}


module.exports = agePopsController;