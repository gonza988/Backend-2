import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as CustomStrategy } from "passport-custom";
import bcrypt from "bcrypt";

import * as usersRepository from "../repositories/users.repository.js";

export const configurePassport = (passport) => {

    passport.use(
        "login",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },

            async (email, password, done) => {

                try {

                    const user = await usersRepository.getByEmail(email);

                    if (!user) {
                        return done(null, false, {
                            message: "Usuario no encontrado"
                        });
                    }

                    const passwordValid = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!passwordValid) {
                        return done(null, false, {
                            message: "Contraseña incorrecta"
                        });
                    }

                    return done(null, user);

                } catch (error) {

                    return done(error);

                }

            }
        )
    );


    passport.use(
        "current",
        new CustomStrategy(async (req, done) => {

            try {

                if (!req.user) {
                    return done(null, false);
                }

                return done(null, req.user);

            } catch (error) {

                return done(error);

            }
        })
    );
};