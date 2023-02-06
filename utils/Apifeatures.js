class Apifeature {
  // contracter
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //   serach anythink accouring qurey
  search(key,keyword) {
    // create  qurey
    const query = this.query
      ?{[key]:{
        $regex: keyword,
        $options: "i",
      }}
      : {};
    //   find qurey
    this.query = this.query.find({ ...query });
    return this;
  }

  //filter the result
  filter() {
    // create copy for qureys
    let query = { ...this.queryStr };

    // create array which qurey want to remove
    const removeQurey = ["keyword", "page"];
    // delete qurey from copy object
    removeQurey.map((key) => delete query[key]);
    // json to string convert
    let queryStr = JSON.stringify(query);
    // using regular expression(regx) add $gt $lt $gte $lte opreter
    queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (value) => `$${value}`);
    // convert into json and find qurey
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  //pagenation
  page() {
    // result pr page
    const postParpage = process.env.POST_PAR_PAGE;

    // carrent page
    const currentPage = this.queryStr.page || 1;

    // how many page skip
    const skipPages = postParpage * (currentPage - 1);

    // get result and filter according to the page number
    this.query = this.query.find().limit(postParpage).skip(skipPages);

    return this;
  }

  map(){
    return this;
  }
}

module.exports = Apifeature;
