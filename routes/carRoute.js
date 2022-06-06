const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Car = require("../model/car");

router.post("/", upload.single("image"), async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Create new car
      let car = new Car({
        name: req.body.name,
        category: req.body.category,
        passenger: req.body.passenger,
        price: req.body.price,
        description: req.body.description,
        startRent: req.body.startRent,
        finishRent: req.body.finishRent,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        image: result.secure_url,
        cloudinary_id: result.public_id,
      });
      // Save car
      await car.save();
      res.json(car);
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/", async (req, res) => {
    try {
      let car = await Car.find();
      res.json(car);
    } catch (err) {
      console.log(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      // Find car by id
      let car = await Car.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(car.cloudinary_id);
      // Delete car from db
      await car.remove();
      res.json(car);
    } catch (err) {
      console.log(err);
    }
  });

  router.put("/:id", upload.single("image"), async (req, res) => {
    try {
      let car = await Car.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(car.cloudinary_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      const data = {
        name: req.body.name || car.name,
        category: req.body.category || car.category,
        passenger: req.body.passenger || car.passenger,
        price: req.body.price || car.price,
        description: req.body.description || car.description,
        startRent: req.body.startRent ||car.startRent,
        finishRent: req.body.finishRent || car.finishRent,
        createdAt: req.body.createdAt || car.createdAt,
        updatedAt: req.body.updatedAt || car.updatedAt,
        image: result?.secure_url || car.image,
        cloudinary_id: result?.public_id || car.cloudinary_id,
      };
      car = await Car.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(car);
    } catch (err) {
      console.log(err);
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      // Find car by id
      let car = await Car.findById(req.params.id);
      res.json(car);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;