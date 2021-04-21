const Credit = require("../model/Credit");
const fetch = require("node-fetch");
const btoa = require('btoa');
const axios = require('axios');
const e = require("express");

var sdk = require("emergepay-sdk");
// production
var oid = "1535166774";
var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOjExMDQsIm9pZCI6MTUzNTE2Njc3NCwidG9rZW5fdXNlIjoib3J0Iiwicm5kIjoxMzcxODQ2NDQ5LjI1MzIzNzUsImdyb3VwcyI6WyJPcmdBUElVc2VycyJdLCJpYXQiOjE2MDU3OTc1NjB9.EeodYvyKoGC_Mp06KdMV8VcuoLQib5ehyPO9Rg5ylNo";
var environmentUrl = "https://api.emergepay.chargeitpro.com/virtualterminal/v1";

var emergepay = new sdk.emergepaySdk({ oid: oid, authToken: authToken, environmentUrl: environmentUrl });

 
exports.creditSaveMongo = async (req, res) => {

        try {
  
              const credit = new Credit({
                email: req.body.email,
                approvalData: req.body.approvalData,
                primary: false,
                maskedNumber: req.body.approvalData.maskedAccount

              })
              
              let data = await credit.save();
              res.status(200).json({ data });
            } catch (err) {
              res.status(400).json({ err: err });
            }
    }


    exports.getCreditCards = async (req, res) => {
  
        try {

          const credit = await Credit.findByCreditEmail(req.params.email)
        //   console.log(credit)
          const usercreditcards = credit
          res.status(201).json({ usercreditcards });
        } catch {
          res.status(400).json({ err: err });
        }
      }
      


      exports.checkCreditCard = async (req, res) => {
 

        try {
            console.log('check credit cards')
            // console.log(req.body)


            const credit = await Credit.find({email: req.body.email, maskedNumber: req.body.approvalData.maskedAccount }, function(err, user) 
            {
               if (err)
               {
                   res.send(err);
               }
               console.log('from the find?');
               console.log(user);
            //    res.json(user);
           
               res.status(201).json({ user });


            });
        


  
        //   console.log(credit)
        //   const usercreditcards = credit
          
        } catch {
          res.status(400).json({ err: err });
        }
      }




      exports.deleteCreditCard = async (req, res) => {

        const creditCardDelete = await Credit.findOneAndDelete({_id: req.body.creditCardId }, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted Card : ", docs);
            }
        });

        res.status(201).json({ creditCardDelete });
      }
      
      
      
      
      exports.primaryCreditCardFalse = async (req, res) => {
          
      
        try {
          // let doc = await Order.findById('5f97465eebb3b9108bc2a50b')
          console.log(req.body.email)
        let doc = await Credit.updateMany(
      { "email": req.body.email },
      { 
          "$set": {
            "primary": false
          }
      },
      function(err,doc) {
      


      }
      );
      
      
      console.log('primary giftcard updated')
      res.status(201).json({ doc });
      } catch (err) {
      console.log(err)
      }
      
         };
      







         exports.primaryCreditCardTrue = async (req, res) => {
          
      
            try {
              // let doc = await Order.findById('5f97465eebb3b9108bc2a50b')
              
            let doc = await Credit.findOneAndUpdate(
          { "_id": req.body.id },
          { 
              "$set": {
                "primary": true
              }
          },
          function(err,doc) {
          
    
    
          }
          );
          
          
          console.log('primary giftcard updated to true id')
          res.status(201).json({ doc });
          } catch (err) {
          console.log(err)
          }
          
             };        





             let primaryCreditCardTrue = async (email) => {
          
      
              try {
                // let doc = await Order.findById('5f97465eebb3b9108bc2a50b')
                
              let doc = await Credit.findOneAndUpdate(
            { "email": email },
            { 
                "$set": {
                  "primary": true
                }
            },
            function(err,doc) {
            
      
      
            }
            );
            
            
            console.log('primary giftcard updated to true id')
            // res.status(201).json({ doc });
            } catch (err) {
            console.log(err)
            }
            
               };        
  







             exports.setPrimaryIfOnlyOne = async (req, res) => {
  
              try {
  
                console.log('set primary if only one')
                console.log(req.body)
                const credit = await Credit.findByCreditEmail(req.body.email)
                console.log(credit)
                const usercreditcards = credit
                res.status(201).json({ usercreditcards });


                  if(credit.length === 1){
                    primaryCreditCardTrue(req.body.email)
                  }


              } catch {
                res.status(400).json({ err: err });
              }
            }










             exports.doTokenizedTransaction = async (req, res) => {
                let orderDivided = req.body.orderTotal/100
                let stringAmount = orderDivided.toFixed(2).toString()
                
                // let ext = '8d40092f-54a1-46ac-9300-0ada024f1573';
                // console.log(ext)
                // let un = '1d5b45fb356b4d0aac91761d7dce8d3c-b7339528a18f44338d3279c0542ae652';
                
                // Ensure that you supply a valid uniqueTransId before trying to run the tokenized payment.
                emergepay.tokenizedPaymentTransaction({
                  uniqueTransId: req.body.transId,
                  externalTransactionId: emergepay.getExternalTransactionId(),
                  amount: stringAmount
                  // Optional
                          })
                .then(function(response) {
                  var data = response.data;
                
                  res.send({data})
                  
                console.log(data)
                
                })
                .catch(function(error) {
                  throw error;
                })
                
                };



