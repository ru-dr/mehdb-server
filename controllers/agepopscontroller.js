const AgePopulation = require('../models/agepopulation')

const agePopsController = {
    getAgePops: async (req, res) => {
        try {
            const agePops = await AgePopulation.find({});
            res.status(200).json(agePops);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}


module.exports = agePopsController;