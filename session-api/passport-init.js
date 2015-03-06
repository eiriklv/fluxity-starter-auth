import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from './models/user';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, done);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, UserModel.signup.bind(UserModel)));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, UserModel.login.bind(UserModel)));
