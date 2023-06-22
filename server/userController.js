const { redirect } = require('react-router-dom');
const db = require('./dbModel');
const bcrypt = require ( 'bcrypt' )
const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password)
    //check that username is unique
    const userQuery = `SELECT username FROM login WHERE username= '${username}'` 
    const user = await db.query(userQuery)
    // console.log(user.rows, user.rows.length)
    if(user.rows.length !== 0){
      // console.log(username,user.rows[0].username )
      return next({
        log : 'Username taken',
        message: {err: 'Username taken'}
      })
    }
    //Find current highest ID number
    const idQuery = `SELECT MAX(id) FROM login`
    let id = await db.query(idQuery)
    let newId;
    if(id.rows[0].max === null){
      newId = 0
    }else{
      newId = id.rows[0].max +=1
    }
    // console.log('LOOK AT ID : ', id.rows)
    // console.log('LOOK AT NEWID : ', newId)
    
    //Add pw hashing here
    const salt = await bcrypt.genSalt()
    const hashedPw = await bcrypt.hash(password, salt)
    // Inserts new user into login table
    const createUserSQL = `INSERT INTO login (username, password, id)
    VALUES ($1, $2, $3)`;
    const response = await db.query(createUserSQL, [username, hashedPw, (newId)]);

    res.locals.msg = 'User Created';
    return next();
  } catch (err) {
    return next({
      log : 'createUser middleware error',
      message: {err: 'createUser middleware error'}
    });
  }
};

userController.loginUser = async (req, res, next) =>{
  res.locals.login = null
  console.log('req body', req.body)
  try{
    const { username, password} = req.body;
    console.log('SIGN IN INFO', username, password)

    const pwQuery = `SELECT password FROM login WHERE username= '${username}'`
    const pw = await db.query(pwQuery);
    console.log('this is pw:', pw.rows);
    
    //compare the password with its hashed version
    if(pw.rows.length > 0){
      // console.log(pw.rows[0].password)
      await bcrypt.compare(`${password}`,`${pw.rows[0].password}`, function(err,result){
        if(err){
          console.log('IN BCRYPT COMPARE ERR')
          return next()
        }
        else if(result == true){
          console.log('PW CHECK IS RIGHT')
          res.locals.login = true
          return next()
        }
        else if(result == false){
          console.log('PW CHECK IS WRONG')
          res.locals.login = false
          return next()
        }
      })
    }
  }
  catch (err) {
    return next({log : `Error in loginUser Middleware: ${err}` });
  }
}

userController.verifyAuth = (req, res, next)=>{
  console.log('IS LOGIN NOT NULL? : ', res.locals.login)
  if(res.locals.login === true){
    console.log('RES LOGIN WAS TRUE')
    return res.redirect ('http://localhost:8080/swipe')
  }else{
    console.log('RES LOGIN WAS FALSE')
    return res.sendstatus(200)
  }
  return next()
}

module.exports = userController;
