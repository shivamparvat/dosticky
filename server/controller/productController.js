const { CatchAsyncError } = require("../middleware/catchasyncerror");
const productModule = require("../module/productModule");
const Crud = require("../utils/crud");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");
const Apifeature = require("../utils/Apifeatures");
const ErrorHeandler = require("../utils/ErrorHeandler");
// const { isUnique } = require("../utils/validation");

// product creation

exports.Product = CatchAsyncError(async (req, res, next) => {
  // create product

  const product = await productModule.create(req.body);
  const files = req.files;
  let myCloud;
  const fileUriList = [];
  for (let i = 0; i < files.length; i++) {
    // convert buffer data to datauri
    const fileUri = getDataUri(files[i]);
    //  upload to cloudinary
    myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    fileUriList.push({
      image_id: myCloud.public_id,
      image_url: myCloud.secure_url,
    });
  }
  product.images = fileUriList;
  // url save in product
  await product.save();
  // responce
  res.status(201).json({
    success: true,
    data: product,
  });
});

exports.productByCategory = CatchAsyncError(async (req, res, next) => {

  const productByCategory = await productModule
    .find({
      category: req.query.category,
    })
    .sort({ createdAt: -1 })
    .limit(4);
  res.status(201).json({
    success: true,
    data: productByCategory,
  });
});

// get product
exports.getProduct = CatchAsyncError(async (req, res, next) => {
  await new Crud(productModule, req, res, next).getOne();
});

exports.chackSku = CatchAsyncError(async (req, res, next) => {
  if (!req.query.sku) next(new ErrorHeandler(400, "sku velue is Empty"));
  await new Crud(productModule, req, res, next).chackUnique({
    sku: req.query.sku,
  });
});

exports.updateProduct = CatchAsyncError(async (req, res, next) => {
  const remove = ["sku", "sellCount", "likes"];
  remove.map((key) => delete req.body[key]);

  const product = await productModule.findById(req.params.id);
  if (!product) next(new ErrorHeandler(404, "product not found"));
  // distroy img
  const index = [];
  const filesid = req.body.imageid;
  // if img id is present then remove img
  if (filesid) {
    for (let i = 0; i < filesid.length; i++) {
      const result = await cloudinary.uploader.destroy(filesid[i]);
      if (result.result === "ok") {
        index.push(
          product.images.findIndex(function (images) {
            return images.image_id == filesid[i];
          })
        );
      }
    }
  }
  // short index arry
  index.sort((a, b) => b - a);
  // remove all links
  for (let i = 0; i < index.length; i++) {
    product.images.splice(index[i], 1);
  }

  // new file data
  const files = req.files;
  let myCloud;
  const fileUriList = [];
  for (let i = 0; i < files.length; i++) {
    // convert buffer data to datauri
    const fileUri = getDataUri(files[i]);
    //  upload to cloudinary
    myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    fileUriList.push({
      image_id: myCloud.public_id,
      image_url: myCloud.secure_url,
    });
  }
  // push licks form images array
  for (let i = 0; i < fileUriList.length; i++) {
    product.images.push(fileUriList[i]);
  }
  // save
  await product.save();
  // update values
  await new Crud(productModule, req, res, next).update("Product");
});

// search only category wish
// 1234 bin
exports.Search = CatchAsyncError(async (req, res, next) => {
  const bin = req.query.bin || true;
  const query = req.query;
  await new Crud(productModule, req, res, next).getAlldata(
    {
      ...query,
    },
    { isActive: bin }
  );
});

exports.SearchUser = CatchAsyncError(async (req, res, next) => {
  const query = req.query;
  await new Crud(productModule, req, res, next).getAlldata(
    "title",
    {
      ...query,
    },
    { isActive: true }
  );
});

// will move product in bin folder
exports.moveToBin = CatchAsyncError(async (req, res, next) => {
  const product = await productModule.findById(req.params.id);
  if (!product) next(new ErrorHeandler(404, "product not found"));
  product.isActive = false;
  await product.save();
  res.status(200).json({
    message: "success",
    data: product,
  });
});

// if product in bin so will delete parmanetly
exports.deleteProduct = CatchAsyncError(async (req, res, next) => {
  const data = await productModule.findById(req.params.id);
  if (!data) next(new ErrorHeandler(404, "product not found"));

  if (!data.isActive) {
    for (let i = 0; i < data.images.length; i++) {
      const element = data.images[i];
      console.log(element.image_id);
      const result = await cloudinary.uploader.destroy(element.image_id);
      if (result.result === "ok") {
        await data.remove();
      }
    }
    res.status(201).json({ message: "success" });
    return data;
  } else {
    data.isActive = false;
    data.save();
    res.status(201).json({ message: "move to bin" });
  }
});

// like
exports.likeProduct = CatchAsyncError(async (req, res, next) => {
  const product = await productModule.updateOne(
    { _id: req.params.id },
    { $addToSet: { likes: req.user._id } }
  );
  if (!product) next(new ErrorHeandler(404, "product not found"));
  res.status(200).json({ message: "success" });
});
