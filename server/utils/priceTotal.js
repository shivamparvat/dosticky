const couponModule = require("../module/couponModule");
const discountModule = require("../module/discountModule");

module.exports = async (Cart) => {
  const dataItem = Cart.items;
  if (dataItem != undefined) {
    let TotalDiscountedPrice = 0,
      totalPrice = 0,
      TotalOriginalPrice = 0;
    tax = 0;
    for (let i = 0; i < dataItem.length; i++) {
      const productData = { ...dataItem[i].product };
      const variantsData = productData._doc.variants;
      for (let j = 0; j < variantsData.length; j++) {
        if (dataItem[i].size === variantsData[j].size) {
          const productPrice = variantsData[j].price;
          const productDiscountprice = variantsData[j].discountprice;
          let quantity =0
          quantity += dataItem[i].quantity;
          TotalOriginalPrice += quantity * productPrice;
          TotalDiscountedPrice += productDiscountprice * quantity;
        }
      }
    }
    tax = Math.ceil(TotalDiscountedPrice * 0.18);
    totalPrice = tax + TotalDiscountedPrice;

    //   totalPrice = TotalOriginalPrice;
    //   // find discount percentage
    //   const discountdata = await discountModule
    //     .find({ quantity: { $lte: quantity } })
    //     .sort({ quantity: "desc" })
    //     .limit(1);

    //   //   // get percentage
    //   //   // calculate discounted price
    //   if (discountdata.length == 1) {
    //     totalPrice -=
    //       (totalPrice * discountdata[0].discount) / 100;
    //   }
    //   //   // apply coupon code
    //   //   // chack coupon exists
    //   if (Cart.coupon != undefined) {
    //     // chack price above then COUPON_APPlY_PRICE
    //     if (totalPrice > process.env.COUPON_APPlY_PRICE) {
    //       // find coupon code
    //       const currentDate = new Date();
    //       const couponData = await couponModule.findOne({
    //         coupon: Cart.coupon,
    //         isActive: true,
    //         expireDate: { $lt: currentDate },
    //       });
    //       // subtract price
    //       totalPrice -= couponData.discount;
    //     }
    //   }
    //   // tax
    return { TotalOriginalPrice, TotalDiscountedPrice, tax, totalPrice };
  }
};
