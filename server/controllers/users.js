const conn = require('./../config/db');
const jwt = require('jsonwebtoken');
const HttpError = require('../settings/error');
const  { User }  = require('./../models');


const UserController = {

    create: async (req, res, next) => {
      const { firstname, lastname, username, password } = req.body;

      let existingUser;
      // checking if the user already exists or not
      try {
        existingUser = await User.findOne({ where: { username: username }});
      } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again later.',
          500
        );
        return next(error);
      }
    
      if (existingUser) {
        const error = new HttpError(
          'User exists already, please login instead.',
          422
        );
        return next(error);
      } 

      const newMember = {
        firstname,
        lastname,
        username,
        password
      };

      let createdUser;
      try {
        createdUser = await User.create(newMember);
        
      } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again later.',
          500
        );
        return next(error);
      }


      let token;
      try {
        token = jwt.sign(
          { userId: createdUser.id, username: createdUser.username },
          'supersecret_dont_share',
          { expiresIn: '1h' }
        );

        // updating the user login status
        createdUser.login = true;
        await createdUser.save();
      } catch (err) {
        const error = new HttpError(
          'Something went wrong to log in automatically. Please try again to log in.',
          500
        );
        return next(error);
      }

      return res.status(201)
                .json({ 
                  userId: createdUser.id, 
                  username: createdUser.username, 
                  token: token, 
                  role: createdUser.role 
                });
    },
    
    getAll: async (req, res, next) => {
      let usres;
      try {
        usres = await User.findAll();
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not get users list',
          500
        );
        return next(error);
        
      }
      
      return res.status(201).json(usres);
    }, 

    signin: async (req, res, next) => {
      const { username, password } = req.body;
      
      let existingUser;
      try {
        existingUser = await User.findOne({ where: { username: username }});
      } catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.',
          500
        );
        return next(error);
      }
      
      if (!existingUser) {
        const error = new HttpError(
          'Invalid credentials, could not log you in.',
          403
        );
        return next(error);
      }
      
      let isValidPassword = false;
      try {
        isValidPassword = password === existingUser.dataValues.password;
      } catch (err) {
        const error = new HttpError(
          'Could not log you in, please check your credentials and try again.',
          500
        );
        return next(error);
      }
      
      if (!isValidPassword) {
        const error = new HttpError(
          'Invalid credentials, could not log you in.',
          403
        );
        return next(error);
      }
      
      let token;
      try {
        token = jwt.sign(
          { userId: existingUser.dataValues.id, username: existingUser.dataValues.username },
          'supersecret_dont_share',
          { expiresIn: '1h' }
        );
      } catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.',
          500
        );
        return next(error);
      }


      try {
        existingUser.login = true;
        await existingUser.save();
      } catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.',
          500
        );
        return next(error);
      }
      
      res.json({
        userId: existingUser.dataValues.id,
        username: existingUser.dataValues.username,
        role: existingUser.dataValues.role,
        token: token
      });
    },

    signout: async (req, res, next) => {
      let user;
      try {
        user = await User.findOne({ where: { id: req.params.id }});
      } catch (err) {
          const error = new HttpError(
              `Something went wrong.`,
              500
          );
          return next(error);
      }

      try {
        user.login = false;
        await user.save();
      } catch(err) {
          const error = new HttpError(
              "Something went wrong, please try again.",
              400
          );
          return next(error);
      }
      return res.json({ message: "User updated" });
    }
}


module.exports = UserController;