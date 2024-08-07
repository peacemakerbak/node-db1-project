const Account = require('./accounts-model')
const db = require('../../data/db-config')


exports.checkAccountPayload = (req, res, next) => {
const error = {status: 400};
const {name, budget} = req.body;

if (name === undefined || budget === undefined) {
 error.message = "name and budget are required";
} else if (typeof name !== 'string'){
  error.message = "name of account must be a string";
} else if (name.trim().length < 3 || name.trim().length > 100) {
  error.message = "name of account must be between 3 and 100";
} else if (typeof budget !== 'number' || isNaN(budget)) {
  error.message = "budget of account must be a number";
}else if(budget < 0 || budget > 100000 ){
  error.message = "budget of account is too large or too small";
}
if (error.message){
  next(error);
} else {
  next();
}
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existing = await db("accounts").where("name", name.trim()).first();
    if (existing) {
      return res.status(400).json({ message: "that name is taken" });
    }
    next();
  } catch (error) {
    next(error);
  }
};


exports.checkAccountId = async (req, res, next) => {
  try{
  const { id } = req.params;
  const account = await Account.getById(id);
  if(!account) {
    return res.status(404).json({message: "account not found"})
  } 
    req.account = account;
    next();
  } catch(err)  {
 next(err);
  }
};
