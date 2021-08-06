const express = require('express')
const { body } = require('express-validator');
const { listBankController, createBankController, updateBankController, deleteBankController } = require('../controllers/banks');
const BankModel = require('../modules/bank');
const router = express.Router();

//routes 
//view banks - get method
router.get('/bank/:id?', listBankController);
//create banks - post method
router.post('/bank', [
    body('name').trim().not().isEmpty(),
    body('location').trim().not().isEmpty().withMessage('location cannot be empty'),
    body('branch').trim().not().isEmpty().withMessage('branch cannot be empty'),
    body('phone').isMobilePhone("en-GH").withMessage('phone cannot be empty')
    .custom((value, {req})=>{
        return BankModel.findOne({'phone': value}).then(
            bankDoc => {
                if (bankDoc)
                return Promise.reject('Phone number already exist');
            }
        )
    })
], createBankController);
//update banks - put method 
router.put('/bank', updateBankController);
// //delete banks - delete method
router.delete('/bank', deleteBankController);

module.exports = router;