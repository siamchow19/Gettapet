const Adoption = require("../models/Adoption");



exports.getOne = async (req, res) => {
    try{
        const {id} = req.params;
        const adoption = await Adoption.findById(id);
        res.json({message: 'done', adoption});
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

exports.getAll = async (req, res) => {
    try{
        const adoptions = await Adoption.find();
        res.json({message: 'done', adoptions});
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

exports.create = async (req, res) => {
    try{
        const { firstName, lastName, email, address, phone, pet } = req.body;
        const created = await Adoption.create({
            firstName,
            lastName,
            email,
            address,
            phone,
            pet,
        });

        res.json({message: 'Adoption created', created});
        

    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

exports.update = async (req, res) => {
    try{
        const {id} = req.params;
        const { firstName, lastName, email, address, phone, pet } = req.body;
        const updated = await Adoption.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            address,
            phone,
            pet,
        },
        {new: true});

        res.json({message: 'Adoption updated', updated});
        

    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}



exports.delete = async (req, res) => {
    try{
        const { id } = req.params;

        const deleted = await Adoption.findByIdAndRemove(id);

        res.json({message: 'Adoption deleted', deleted});
        

    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}