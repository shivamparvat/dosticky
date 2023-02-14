const ErrorHandler = require("../utils/ErrorHeandler");
const Apifeature = require("./Apifeatures");

class Crud {
  constructor(module, req, res, next) {
    this.module = module;
    this.req = req;
    this.res = res;
    this.next = next;
    this.data = {};
  }
  async create() {
    const data = await this.module.create(this.req.body);
    this.data = data;
    this.res.status(201).json({
      massage: "success",
      data,
    });
    return data;
  }

  //   get only one
  async getOne(massage) {
    const data = await this.module.findById(this.req.params.id);
    if (!data) this.next(new ErrorHandler(404, massage + "not found"));
    this.data = data;
    this.res.status(201).json({
      massage: "success",
      data,
    });
    return data;
  }

  async chackUnique(item){
    const data = await this.module.findOne(item)
    if(!data){
      this.res.status(200).json({
        massage: "success",
        unique:true
      });
    }else{
      this.res.status(200).json({
        massage: "this isn't unique",
        unique:false
      });
    }
  }

  async getAlldata(key, query) {
    const apifeatures = new Apifeature(this.module.find(), query)
      .search(key, this.req.query.keyword)
      .filter()
      .page();
    const data = await apifeatures.query;
    this.data = data;
    this.res.status(201).json({ massage: "success", data });
    return data;
  }

  async update(massage) {
    const data = await this.module.findByIdAndUpdate(
      this.req.params.id,
      this.req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    if (!data) this.next(new ErrorHandler(404, massage + "not found"));
    this.data = data;
    this.res.status(201).json({ massage: "success", data });

    return data;
  }

  async delete(massage) {
    const data = this.module.findById(this.req.params.id);
    if (!data) this.next(new ErrorHandler(404, massage + "not found"));
    await data.remove();
    this.res.status(201).json({ massage: "success" });
  }
  
  async deleteForBin(massage) {
    const data = this.module.findById(this.req.params.id);
    if (!data) this.next(new ErrorHandler(404, massage + "not found"));
    if (data.isActive) {
      await data.remove();
      this.res.status(201).json({ massage: "success" });
      return data;
    }
    data.isActive = true;
    data.save({ validateBeforeSave: false });
    this.res.status(201).json({ massage: "move to bin" });
    return data;
  }
}

module.exports = Crud;
