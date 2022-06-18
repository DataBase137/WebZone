const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const argon = require('argon2');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

app.use(express.json({ limit: '2.5mb' }));
app.use(cors({ origin: "http://localhost:3000" }));

/* app.get("/", (req, res) => {
    res.send("Hello world!");
}); */

app.post("/signup", async (req, res) => {
    const username = req.body?.username || "";
    const email = req.body?.email || "";
    const password = req.body?.password || "";

    /* if (username === "" || email === "" || password === "") {
        res.status(400).json({ error: "Please provide a username, email, and password." });
        return;
    } */

    try {
        // Check if email already exists in the database 
        const allEmails = await prisma.user.findMany({
            select: {
                email: true,
                name: true
            }
        });
        const similarEmails = await Promise.all(await allEmails.map(async (e) => {
            const similarEmail = await argon.verify(e.email, email);

            return {
                similar: (similarEmail || e.name === username),
                similarEmail,
                similarName: e.name === username,
            };
        }));

        for (let i = 0; i < similarEmails.length; i++) {
            if (similarEmails[i].similar) {
                res.status(400).json({
                    success: false,
                    validities: [similarEmails[i].similarName, similarEmails[i].similarEmail]
                });
                return;
            }
        }
    } catch (err) {
        res.status(500).json({ success: false, error: "Something went wrong, sorry about that............................." });
        return;
    }

    try {
        const hashedEmail = await argon.hash(email);
        const hashedPassword = await argon.hash(password);

        // Object contains the newly inserted user
        const newUser = await prisma.user.create({
            data: {
                name: username,
                email: hashedEmail,
                password: hashedPassword
            }
        });

        // accessToken lasts 15 minutes, refreshToken lasts 1 month
        const accessToken = await jwt.sign(newUser, process.env.AT_SECRET, { expiresIn: 60 * 15 });
        const refreshToken = await jwt.sign({ id: newUser.id }, process.env.RT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });

        res.status(200).json({
            user: newUser, accessToken, refreshToken,
            success: true,
            validities: [false, false]
        });
    } catch (err) {
        // err has info about the error, such as the error code and a description of the error!
        // Check if the current error was caused by a non-unique field being inserted!    
        res.status(400).json({ error: "That email or name already exists! Please choose a different name/email." });
    }
});

app.post('/generateTokens', async (req, res) => {
    const username = req.body?.username || "";
    const email = req.body?.email || "";
    const password = req.body?.password || "";

    try {
        const user = await prisma.user.findUnique({
            where: { name: username }
        });

        if (!user) {
            res.status(400).json({ success: false, message: "Invalid username" });
            return;
        }

        const accessToken = await jwt.sign(user, process.env.AT_SECRET, { expiresIn: 20 });
        const refreshToken = await jwt.sign({ id: user.id }, process.env.RT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });

        res.status(200).json({ success: true, accessToken, refreshToken });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Something went wrong trying to find your account..." });
    }
});

app.post('/login', async (req, res) => {
    const accessToken = req.body?.accessToken || "";
    const refreshToken = req.body?.refreshToken || "";

    try {
        const decodedAccessToken = await jwt.verify(accessToken, process.env.AT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decodedAccessToken?.id }
        });

        if (!user) {
            res.status(400).json({ success: false, message: "Invalid access token" });
            return;
        }

        res.status(200).json({ success: true, generateNewTokens: false, user });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            if (err instanceof jwt.TokenExpiredError || err.message === "jwt must be provided") {
                try {
                    // Stores the user ID
                    const decodedRefreshToken = await jwt.verify(refreshToken, process.env.RT_SECRET);

                    const user = await prisma.user.findUnique({
                        where: { id: decodedRefreshToken.id }
                    });
                    if (!user) {
                        res.status(400).json({ success: false, message: "Invalid refresh token" });
                        return;
                    }

                    const refreshTokenBanned = await prisma.invalidRTs.findUnique({
                        where: { token: refreshToken }
                    });
                    if (refreshTokenBanned) {
                        res.status(403).json({ success: false, message: "Invalid refresh token" });
                        return;
                    }

                    await prisma.invalidRTs.create({
                        data: { token: refreshToken }
                    });

                    const newAccessToken = await jwt.sign(user, process.env.AT_SECRET, { expiresIn: 20 });
                    const newRefreshToken = await jwt.sign({ id: user.id }, process.env.RT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });

                    res.status(200).json({ success: true, generateNewTokens: true, newAccessToken, newRefreshToken, user });
                } catch (err) {
                    if (err instanceof jwt.JsonWebTokenError) {
                        res.status(400).json({ success: false, response: "Invalid refresh token" });
                        return;
                    }
                }
            } else {
                res.status(500).json({ success: false, message: err });
                return;
            }
        }
    }
});

app.listen(4242, () => console.log("Server started on port 4242"));