const path = require('path');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2
const fs = require('fs');


 // for Local file upload to local
const uploadProductImageLocal  = async(req, res) =>{
   // Check if file exists
   // Check format
   // Chaeck Size
   console.log(req.files)
   // Check if file exists
   if(!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
   }

    //console.log(req.files);
    // where we store the images
    let productImage = req.files.image;
    // Check format
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please Upload Image');
    }

     // Chaeck Size
     const maxSize = 1024 * 1024;
     if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('Please Upload image smaller 1KB');
     }

    const imagePath = path.join(
        __dirname, '../public/uploads/' + `${productImage.name}`
    );
    await productImage.mv(imagePath);

   // res.send('upload product image');
   return res.status(StatusCodes.OK).json({image: {src: `/uploads/${productImage.name}`}});
};

// For cloud file upload to the cloud with cloudinary
const uploadProductImage = async (req, res) =>{
   //console.log(req.files.image)
// cloudinary.uploader locate where to store 
     // this save the upload file loaclly too 
   const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
    use_filename:true,
    folder: 'file-upload',
   });
   //but with the addtion of this it with not save the upload file locally again
   fs.unlinkSync(req.files.image.tempFilePath);
  // console.log(result);
  return res.status(StatusCodes.OK).json({ image: {src: result.secure_url}});
};

module.exports = {
    uploadProductImage,
}