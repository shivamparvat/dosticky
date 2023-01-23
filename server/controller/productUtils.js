const { CatchAsyncError } = require("../../../middleware/error/catchasyncerror");
const variantModule = require("../../../module/shop_category/eshop/variantModule");
const Crud = require("../../../utils/crud");
// ##########################################
// variant
// ##########################################

exports.Variant = CatchAsyncError(
  async (req, res, next) =>
    await new Crud(variantModule, req, res, next).create()
);

exports.updateVariant = CatchAsyncError(
  async (req, res, next) =>
    await new Crud(variantModule, req, res, next).update("Variant")
);

exports.getVariant = CatchAsyncError(
  async (req, res, next) =>
    await new Crud(variantModule, req, res, next).getOne("Variant")
);

exports.getAllVariant = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id,
    query = req.query;
  if (!id) next(new ErrorHandler(404, "Variant id must be require"));
  await new Crud(variantModule, req, res, next).getAlldata("1234", {
    user_id: id,
    ...query,
  });
});

exports.deleteVariant = CatchAsyncError(
  async (req, res, next) =>
    await new Crud(variantModule, req, res, next).delete("Variant")
);
