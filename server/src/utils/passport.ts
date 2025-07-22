import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from '~/modules/user/user-model';
import AuthModel from '~/modules/auth/auth-model';

const configurePassport = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || ''
      },
      async (jwtPayload, done) => {
        try {
          const userId =
            jwtPayload.id ||
            jwtPayload._id ||
            jwtPayload.userId ||
            jwtPayload.sub;
          if (!userId) return done(null, false);

          const user = await UserModel.findById(userId);

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID || '',
        clientSecret: process.env.FACEBOOK_APP_SECRET || '',
        callbackURL: '/api/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = null;
          const email = profile.emails?.[0]?.value;
          if (email) {
            user = await UserModel.findOne({ email });
          }
          if (!user) {
            user = await UserModel.create({
              email: email || '',
              name: profile.displayName,
              avatar: profile.photos?.[0]?.value || '',
              providers: ['facebook'],
              role: 'user'
            });
          } else if (!user.providers.includes('facebook')) {
            user.providers.push('facebook');
            await user.save();
          }

          let auth = await AuthModel.findOne({
            provider: 'facebook',
            providerId: profile.id
          });
          if (!auth) {
            auth = await AuthModel.create({
              user: user._id,
              provider: 'facebook',
              providerId: profile.id
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: '/api/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create user by email
          let user = null;
          const email = profile.emails?.[0]?.value;
          if (email) {
            user = await UserModel.findOne({ email });
          }
          if (!user) {
            user = await UserModel.create({
              email: email || '',
              name: profile.displayName,
              avatar: profile.photos?.[0]?.value || '',
              providers: ['google'],
              role: 'user'
            });
          } else if (!user.providers.includes('google')) {
            user.providers.push('google');
            await user.save();
          }

          // Find or create auth record
          let auth = await AuthModel.findOne({
            provider: 'google',
            providerId: profile.id
          });
          if (!auth) {
            auth = await AuthModel.create({
              user: user._id,
              provider: 'google',
              providerId: profile.id
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

export default configurePassport;
