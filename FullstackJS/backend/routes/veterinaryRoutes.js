import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hola veterinarios')
})

router.get('/login', (req, res) => {
    res.send('Login')
})

export default router;