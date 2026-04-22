const { spec } = require('pactum');

it('API - Deve autenticar um usuário corretamente', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .expectStatus(200)
        .expectJsonMatch('success', true)
});