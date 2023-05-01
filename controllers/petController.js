const Pet = require("../models/Pet");
const fs = require('fs');
const path = require('path');


exports.getAll = async (req, res) => {
    try{
        const pets = await Pet.find();
        res.json(pets);
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

exports.getOne = async (req, res) => {
    try{
        const { id } = req.params;
        const pet = await Pet.findById(id);
        res.json(pet);
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

exports.create = async (req,res) =>{
   try{
        console.log(req.files);
        const{ name, age, color, breed, description, imageLabel, category } = req.body;
        const{ image, additionalImages } = req.files;

        let imagePath = '';
        let additionalImagesPath = [];

        if(image && image.length > 0){
            imagePath = image[0].path;
        }

        if(additionalImages && additionalImages.length > 0){
            additionalImagesPath = additionalImages.map(file => file.path);
        }

        const createdPet = await Pet.create({
            name,
            age,
            breed,
            color,
            description,
            imageLabel,
            category,
            image: imagePath,
            additionalImages: additionalImagesPath,
        });

        res.json({message: 'Pet created', createdPet})
    }

    catch(error){
        console.log(error);
        res.status(400).json(error);
    }

}

exports.update = async (req,res) =>{
    try{
         const { id } = req.params;
         const{ name, age, color, breed, description, imageLabel, category } = req.body;
         const{ image, additionalImages } = req.files;
 
         let imagePath = '';
         let additionalImagesPath = [];
 
         if(image && image.length > 0){
             imagePath = image[0].path;
         }
 
         if(additionalImages && additionalImages.length > 0){
             additionalImagesPath = additionalImages.map(file => file.path);
         }

         const existingPet = await Pet.findById(id);

         if(additionalImagesPath.length === 0){
            additionalImagesPath = existingPet.additionalImages;
         }else{
            Promise.all(existingPet.additionalImages.map(
                async(img) =>
                    await fs.unlink(path.join(__dirname, '../', img), (err, res) => {
                        if(err){
                            console.log(err);
                        }else{
                            console.log('Files deleted successfully');
                        }
                    })
            )).then(console.log)
            .catch(console.log);
         }


         if(imagePath.length === 0){
            imagePath = existingPet.image;
         }else{
            await fs.unlink(path.join(__dirname, '../', image), (err,res) => {
                if(err){
                    console.log(err);
                }else{
                    return;
                }
            })
         }
 
         const updatedPet = await Pet.findByIdAndUpdate(id, {
             name,
             age,
             breed,
             color,
             description,
             imageLabel,
             category,
             image: imagePath,
             additionalImages: additionalImagesPath,
         }, {new: true});
 
         res.json({message: 'Pet updated', updatedPet})
     } 
 
     catch(error){
         console.log(error);
         res.status(400).json(error);
     }
 
 }

 exports.delete = async (req, res) => {
    try{
        const { id } = req.params;

        const deleted = await Pet.findByIdAndRemove(id);

        res.json({message: 'done', deleted});
        

    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}