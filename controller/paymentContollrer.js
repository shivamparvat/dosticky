const { CatchAsyncError } = require("../middleware/catchasyncerror");
const {instance}= require("../index")

exports.createPaymentOrder = CatchAsyncError(async (req, res, next) => {
  const paymentOptions = {
    amount: req.body.price * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  // data.instance
  console.log(await instance);
  // await instance.orders.create(paymentOptions, function(err, order) {
  //     console.log(order);
  //   })
});
