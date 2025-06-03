import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '~/modules/user/userModel';

const configurePassport = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || ''
  };

  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        const userId =
          jwtPayload.id ||
          jwtPayload._id ||
          jwtPayload.userId ||
          jwtPayload.sub;

        if (!userId) {
          return done(null, false);
        }

        const user = await UserModel.findById(userId);
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export default configurePassport;
