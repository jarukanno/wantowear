const express = require('express'),
      router =  express.Router();
      
     
      
      Category = require('../models/category'),
      Stock = require('../models/stock'), 
      Color = require('../models/color'),
      Size = require('../models/size'),
      Product = require('../models/product'),
      Cart = require('../models/cart'),
      middleware = require('../middleware');

router.get("/want2wear/new", function(req,res,next){
    res.render("add");

});

router.post("/want2wear/new", function(req,res,next){
    let n_name = req.body.name;
    let n_category = req.body.category;
    let n_image = req.body.image;
    let n_details = req.body.details;
    let n_size = req.body.size;
    let n_color = req.body.color;
    let n_quantity = req.body.quantity;
    let n_price = req.body.price;
    console.log(n_details);
    let n_product = {ProductName:n_name,image:n_image,details:n_details,price:n_price};            
    
    Product.findOne({ProductName: n_name}, function(err,found){
        if(err){
            console.log(err);
        }else{
            // console.log(found);
            if(found == null){

                Product.create(n_product , function(err,product){
                    if(err){
                        console.log(err);
                    }
                    else{
                        //console.log(product);
                        Category.findOne({categoryName: n_category}, function(err,foundCategory){
                            if(err){
                                console.log(err);
                            }
                            else{
                                foundCategory.productID.push(product);
                                foundCategory.save((err,Savecate) =>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log(Savecate);
                                    }
                                });
                                Product.findOne({ProductName: n_name}, function(err,foundProduct){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        
                                        foundProduct.categories.push(foundCategory);
                                        foundProduct.save(function(err,data){
                                            if(err){
                                                console.log(err);
                                            }
                                            else{
                                                
                                                console.log(data);
                                                Color.findOne({colorName: n_color}, function(err,foundColor){
                                                    if(err){
                                                        console.log(err);
                                                    }
                                                    else{
                                                        // console.log(foundColor);
                                                        Size.findOne({sizeName: n_size}, (err,foundSize) => {
                                                            if(err){
                                                                console.log(err);
                                
                                                            }
                                                            else{
                                                                 
                                                                // console.log(foundSize);
                                                                Stock.create({quantity: n_quantity} , function(err,CreateStock){
                                                                    if(err){
                                                                        console.log(err);
                                
                                                                    }
                                                                    else{
                                                                        // console.log(CreateStock);
                                                                        CreateStock.productID.push(data);
                                                                        CreateStock.colors.push(foundColor);
                                                                        CreateStock.size.push(foundSize);
                                                                        CreateStock.save(function(err,Addstock){
                                                                            if(err){
                                                                                console.log(err);
                                                                            }
                                                                            else{
                                                                                // console.log(stock);
                                                                                Product.findOne({ProductName: n_name}, function(err,pushProduct){
                                                                                        if(err){
                                                                                            console.log(err);
                                                                                        }else{
                                                                                            pushProduct.stock.push(Addstock);
                                                                                            pushProduct.save((err,addStock)=>{
                                                                                                if(err){
                                                                                                    console.log(err);
                                                                                                }
                                                                                                else{
                                                                                                    console.log(addStock);
                                                                                                    res.redirect('/want2wear/new');
                                                                                                }
                                                                                            });
                                                                                        
                                                                                        }
                                                                                });

                                                                                
                                                                            }
                                                                        });                                                                       
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });                                                                               
                                            }
                                        });
                                    }       
                                });
                            }
                        });
                        // Color.findOne({colorName: n_color}, function(err,foundColor){
                        //     if(err){
                        //         console.log(err);
                        //     }
                        //     else{
                               
                        //         Product.findOne({ ProductName : n_name}, (err,nullColor) => {
                        //             if(err){
                        //                 console.log(err);
                        //             }
                        //             else{
                        //                 //console.log(nullColor);
                        //                 nullColor.color.push(foundColor);
                        //                 nullColor.save((err,saveColor) =>{
                        //                     if(err){
                        //                         console.log(err);
                        //                     }
                        //                     else{
                        //                         //console.log(saveColor);
                        //                     }
                        //                 })
                        //             }
                        //         });
                        //     }
                        // });
                        // Size.findOne({sizeName: n_size}, function(err,foundSize){
                        //     if(err){
                        //         console.log(err);
                        //     }
                        //     else{
                                
                        //         Product.findOne({ ProductName : n_name}, (err,nullSize) => {
                        //             if(err){
                        //                 console.log(err);
                        //             }
                        //             else{
                        //                 //console.log(nullSize);
                        //                 nullSize.size.push(foundSize);
                        //                 nullSize.save((err,saveSize) =>{
                        //                     if(err){
                        //                         console.log(err);
                        //                     }
                        //                     else{
                        //                         //console.log(saveSize);
                        //                     }
                        //                 })
                        //             }
                        //         });
                        //     }
                        // });
                    }                  
                });

                

                
            }
            else {
              
                // Color.findOne({colorName: n_color}, function(err,foundColor){
                //     if(err){
                //         console.log(err);
                //     }
                //     else{
                //         //console.log(foundColor);
                //         Product.findOne({ProductName : n_name , color : foundColor}, (err,nullColor) =>{
                            
                //            // console.log(nullColor);
                //             if(nullColor == null ){
                //                 //console.log(nullColor);
                //                 Product.findOne({ProductName: n_name}, (err,addProductColor) => {
                //                     if(err){
                //                         console.log(err);
                //                     }
                //                     else{
                //                         addProductColor.color.push(foundColor);
                //                         addProductColor.save((err,saveColor) =>{
                //                             if(err){
                //                                 console.log(err);
                //                             }
                //                             else{
                //                                 //console.log(saveColor);
                //                             }
                //                         });
                //                     }
                //                 });
                                
                //             }
                           
                //             else{
                //                 console.log("Color Already exist");
                                
                                
                //             }
                //         });
                //     }
                // });

                // Size.findOne({sizeName: n_size}, function(err,foundSize){
                //     if(err){
                //         console.log(err);
                //     }
                //     else{
                //         //console.log(foundSize);
                //         Product.findOne({ProductName : n_name , size : foundSize}, (err,nullSize) =>{
                            
                            
                //             if(nullSize == null ){
                //                // console.log(nullSize);
                //                 Product.findOne({ProductName: n_name}, (err,addProductSize) => {
                //                     if(err){
                //                         console.log(err);
                //                     }
                //                     else{
                //                         addProductSize.size.push(foundSize);
                //                         addProductSize.save((err,saveSize) =>{
                //                             if(err){
                //                                 console.log(err);
                //                             }
                //                             else{
                //                                // console.log(saveSize);
                //                             }
                //                         });
                //                     }
                //                 });
                //             }
                           
                //             else{
                //                 console.log("Size Already Exist");
                                
                                
                //             }
                //         });
                //     }
                // });

                Color.findOne({colorName: n_color}, function(err,foundColor){
                    if(err){
                        console.log(err);
                    }
                    else{
                        // console.log(foundColor);
                        Size.findOne({sizeName: n_size}, (err,foundSize) => {
                            if(err){
                                console.log(err);

                            }
                            else{
                                 
                                // console.log(foundSize);
                                Stock.create({quantity: n_quantity} , function(err,CreateStock){
                                    if(err){
                                        console.log(err);

                                    }
                                    else{
                                        Stock.findOne({productID : found, colors : foundColor , size: foundSize}, (err,nullStock) =>{
                                            
                                            if(nullStock == null){
                                                CreateStock.productID.push(found);
                                                CreateStock.colors.push(foundColor);
                                                CreateStock.size.push(foundSize);
                                                CreateStock.save(function(err,Addstock){
                                                    if(err){
                                                        console.log(err);
                                                    }
                                                    else{
                                                        // console.log(stock);
                                                        Product.findOne({ProductName: n_name}, function(err,pushProduct){
                                                                if(err){
                                                                    console.log(err);
                                                                }else{
                                                                    pushProduct.stock.push(Addstock);
                                                                    pushProduct.save((err,addStock)=>{
                                                                        if(err){
                                                                            console.log(err);
                                                                        }
                                                                        else{
                                                                            console.log(addStock);
                                                                            res.redirect('/want2wear/new');
                                                                        }
                                                                    });
                                                                
                                                                }
                                                        });

                                                        
                                                    }
                                                 });                          
                                                }
                                            else{
                                                console.log("Already has in Stock");
                                            }
                                        });
                                        
                                                                                     
                                    }
                                });
                            }
                        });
                    }
                });                                                         
            }
        }
    });  
});


router.get("/want2wear/category",function(req,res,next){

    var value = req.query.value;
    // console.log(value);

    Category.findOne({categoryName: value}).populate('productID').exec(function (err, allProduct) {
            if (err) {
                return handleError(err);
            }
            else{
                //console.log(allProduct);
                res.render("category", {Product:allProduct, Category: value});
                // console.log(allProduct);
            }
    
    
         });

});

router.delete('/want2wear/delete/:id', (req, res,next ) => {
    console.log(req.params.id);
    Product.findById(req.params.id).exec().then( product => {
        // console.log(product.categories);
        Category.updateOne({_id: product.categories},{"$pull":{"productID":req.params.id}}, {safe:true, multi:true}).exec().then( catagory =>{
            // console.log(catagory);
            // Category.findOne({productID: req.body.id} ).exec().then( removeCate =>{
            //     console.log(removeCate);
            // })
        }).catch(err => {
            console.log(err);
        });
        Stock.deleteMany({productID: req.params.id}).exec().then ( deleteStock =>{
            console.log(deleteStock);
        })
        Product.findByIdAndRemove(req.params.id).exec().then( remove =>{
            console.log(remove);
             res.redirect(req.get('referer'));
        });

    })
    
    .catch(err => {
        console.log(err);
    });

});

router.get("/want2wear/:id", function(req,res,next){

   Product.findById(req.params.id)
    .populate('size color stock review')
    .populate({
        path: 'stock', 
        populate: [{
            path: 'size',
            model: 'Size'
        },{
            path: 'colors',
            model: 'Color'
        }
    ]
    })
    .exec(function (err,show){
//    .deepPopulate('stock.size')
       if(err){
           console.log(err);
       }else{
        //    console.log(show);
         res.render("showdetails", {Product:show});
       }
   });

});



router.post("/want2wear/add-to-cart", function(req,res,next){
    let options = req.body.Options;
    let quantity = parseInt(req.body.quantity);
   
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
    // let username = currentUser.username;

    
   Stock.findById(options).populate('productID size colors')
//    .populate({
//        path: 'productID', 
//        populate: [{
//            path: 'price',
//            model: 'Product'
//        },{
//            path: 'ProductName',
//            model: 'Product'
//        }
//    ]
//    })
   .exec( function(err,stock){
       if(err){
           console.log(err);
       }
       else{
          
           let product = stock.productID;
           let Available = stock.quantity;
           
           Product.findById(product , function(err,findPrice){
               if(err){
                   console.log(err);
               }
               else{
                   let price = findPrice.price;
                   let productID = findPrice._id;
                
                   let addOne = {options:options,price:price,qty:quantity,available: Available};
                //    console.log(addOne);
                   cart.add(addOne,options);
                   req.session.cart = cart;
                //    delete req.session.cart;
                   console.log(req.session.cart)
                   res.redirect(req.get('referer'));
               }
           });
           
       
       }
   });

});





module.exports = router;
