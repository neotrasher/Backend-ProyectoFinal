import { describe, it, before } from 'mocha';
import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';

dotenv.config();

const requester = supertest('http://localhost:8080');

describe('Testing del carrito en Tienda Online', function () {
    let userToken;
    let cookie;

    before(async function () {
        const userCredentials = {
            email: process.env.TEST_USER_EMAIL,
            password: process.env.TEST_USER_PASSWORD,
        };

        const response = await requester.post('/users/api/login').send(userCredentials);
        console.log(response.body)
        cookie = response.headers['set-cookie'];
        console.log(cookie);
        userToken = response.body.token;
    });

    describe('Prueba de creación de carrito', function () {
        it('POST /api/carts, se espera crear un nuevo carrito', async function () {
            try {
                const response = await requester.post('/api/carts')
                    .set("Cookie", cookie)
                console.log(response.body)
                expect(response.body.products).to.be.empty;
            } catch (error) {
                console.error("ERROR: ", error);
                throw error;
            }
        });
    });
    describe('Prueba de agregar producto al carrito', function () {
        it('POST /api/carts/:cid/products/:pid, se espera agregar un producto al carrito', async function () {
            try {
                const cartId = '64fccc82e9a7594d3d208a7c'; 
                const productId = '6570af827c822e4e0d634864'; 
                const response = await requester.post(`/api/carts/${cartId}/products/${productId}`)
                    .set("Cookie", cookie)
                    .send({
                        quantity: 1
                    });
                console.log(response.body)
                expect(response.body.products).to.have.length(1);
            } catch (error) {
                console.error("ERROR: ", error);
                throw error;
            }
        });
    });
    
    describe('Prueba de compra del carrito', function () {
        it('POST /api/carts/:cid/purchase, se espera comprar el carrito', async function () {
            try {
                const cartId = '64fccc82e9a7594d3d208a7c'; 
                const response = await requester.post(`/api/carts/${cartId}/purchase`)
                    .set("Cookie", cookie);
                console.log(response.body)
                expect(response.body.message).to.equal('Compra finalizada.');
            } catch (error) {
                console.error("ERROR: ", error);
                throw error;
            }
        });
    });
});