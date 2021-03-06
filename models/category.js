const   mongoose = require('mongoose');
        

let categorySchema = new mongoose.Schema({

    categoryName: {type: String, required: true},
    productID:[{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]

}, { usePushEach: true });
   


let Category = mongoose.model("Category", categorySchema,);
module.exports = Category;
