const couponModule = require("../module/couponModule");
const discountModule = require("../module/discountModule");

module.exports = async (Cart) => {
  const dataItem = Cart.items;
  let totalDiscountePrice = 0,
    quantity = 0,
    totalPrice = 0;
  for (let i = 0; i < dataItem.length; i++) {
    const productPrice = dataItem[i].product.price;
    quantity += dataItem[i].quantity;
    totalPrice += quantity * productPrice;
  }
  totalDiscountePrice = totalPrice;
  // find discount percentage
  const discountdata = await discountModule
    .find({ quantity: { $lte: quantity } })
    .sort({ quantity: "desc" })
    .limit(1);

  //   // get percentage
  //   // calculate discounted price
  if (discountdata.length == 1) {
    totalDiscountePrice -=
      (totalDiscountePrice * discountdata[0].discount) / 100;
  }
  //   // apply coupon code
  //   // chack coupon exists
  if (Cart.coupon != undefined) {
    // chack price above then COUPON_APPlY_PRICE
    if (totalDiscountePrice > process.env.COUPON_APPlY_PRICE) {
      // find coupon code
      const currentDate = new Date();
      const couponData = await couponModule.findOne({
        coupon: Cart.coupon,
        isActive: true,
        expireDate: { $lt: currentDate },
      });
      // subtract price
      totalDiscountePrice -= couponData.discount;
    }
  }
  return { totalDiscountePrice, totalPrice };
};
