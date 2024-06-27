const request = require('supertest');
const express = require('express');
const { validationResult } = require('express-validator');
const { registerValidation, loginValidation } = require('../middlewares/Validation/authValidation');

const app = express();
app.use(express.json());

// Mock routes for testing validation middleware
app.post('/register', registerValidation(), (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.status(200).send('Passed');
    } catch (error) {
        console.error('Error in /register route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', loginValidation(), (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.status(200).send('Passed');
    } catch (error) {
        console.error('Error in /login route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

describe('Auth Validator', () => {
    describe('Register Validation', () => {
        it('should fail if name is empty', async () => {
            const response = await request(app)
                .post('/register')
                .send({ name: '', email: 'test@example.com', password: 'Password1!', confirmPassword: 'Password1!' });
            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('Name is required');
        });

        it('should fail if email is invalid', async () => {
            const response = await request(app)
                .post('/register')
                .send({ name: 'Test', email: 'invalidemail', password: 'Password1!', confirmPassword: 'Password1!' });
            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('Valid email is required');
        });

        it('should fail if password is weak', async () => {
            const response = await request(app)
                .post('/register')
                .send({ name: 'Test', email: 'test@example.com', password: 'pass', confirmPassword: 'pass' });
            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('Password must be at least 6 characters long');
        });

        it('should fail if passwords do not match', async () => {
            const response = await request(app)
                .post('/register')
                .send({ name: 'Test', email: 'test@example.com', password: 'Password1!', confirmPassword: 'Password2!' });
            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('Passwords do not match');
        });

        it('should pass with valid data', async () => {
            const response = await request(app)
                .post('/register')
                .send({ name: 'Test', email: 'test@example.com', password: 'Password1!', confirmPassword: 'Password1!' });
            expect(response.status).toBe(200);
            expect(response.text).toBe('Passed');
        });
    });

    describe('Login Validation', () => {
        it('should fail if email is empty', async () => {
            const response = await request(app)
                .post('/login')
                .send({ email: '', password: 'Password1!' });
            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('Email is required');
        });

        it('should fail if email is invalid', async () => {
            const response = await request(app)
                .post('/login')
                .send({ email: 'invalidemail', password: 'Password1!' });
            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('Valid email is required');
        });

        it('should fail if password is empty', async () => {
            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: '' });
            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('Password is required');
        });

        it('should pass with valid data', async () => {
            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'Password1!' });
            expect(response.status).toBe(200);
            expect(response.text).toBe('Passed');
        });
    });
});
