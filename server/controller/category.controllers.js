const { CatchAsyncError } = require("../middleware/catchasyncerror.middlewares");
const Crud = require("../utils/crud");
const categoryModule = require("../module/categoryModule");
const dataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");

exports.newCategory = CatchAsyncError(async (req, res, next) => {
  const category = await categoryModule.create(req.body);
  let updatedData;
  if (req.file != undefined) {
    // create data uri for file buffer
    const fileUri = dataUri(req.file);
    // upload file
    const dataURL = await cloudinary.v2.uploader.upload(fileUri.content);
    // add url
    updatedData = await categoryModule.findByIdAndUpdate(
      category._id,
      {
        images: { image_id: dataURL.asset_id, image_url: dataURL.secure_url },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
      );
    }
    console.log(updatedData)

  res.status(201).json({
    message: "success",
    data: updatedData ? updatedData : category,
  });
});

exports.getCategory = CatchAsyncError(async (req, res, next) => {
  await new Crud(categoryModule, req, res, next).getOne();
});

exports.updateCategory = CatchAsyncError(async (req, res, next) => {
  const category = await categoryModule.findById(req.params.id);
  if (!category) next(new ErrorHandler(404, "category not found"));
  if (req.file != undefined) {
    // create data uri for file buffer
    const fileUri = dataUri(req.file);
    // upload file
    const dataURL = await cloudinary.v2.uploader.upload(fileUri.content);
    // add url
    updatedData = await categoryModule.findByIdAndUpdate(
      req.params.id,
      {
        images: { image_id: dataURL.asset_id, image_url: dataURL.secure_url },
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(201).json({
      message: "success",
      data: updatedData,
    });
  } else {
    await new Crud(categoryModule, req, res, next).update();
  }
});

exports.categoryByName = CatchAsyncError(async (req, res, next) => {
  const bin = req.query.bin || true;
  const query = req.query;
  await new Crud(categoryModule, req, res, next).getAlldata("cetagory", {
    ...query,
  });
});

exports.deleteCategory = CatchAsyncError(async (req, res, next) => {
  await new Crud(categoryModule, req, res, next).delete("cetagory");
});
