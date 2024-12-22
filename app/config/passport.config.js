import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const cookieExtractor = (req) => {
  let token = null;
  if (req?.cookies) {
    token = req.cookies[process.env.COOKIE_NAME]; // Nombre de la cookie
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.COOKIE_KEY, // Clave secreta definida en .env.local
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;