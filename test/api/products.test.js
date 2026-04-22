const { spec, request } = require('pactum');

describe('Produtos - Suíte de Testes API', () => {
  let productId;

  before(async () => {
    const loginRes = await spec()
      .post('http://lojaebac.ebaconline.art.br/public/authUser')
      .withJson({
        email: "admin@admin.com",
        password: "admin123"
      });
    
    request.setDefaultHeaders('Authorization', loginRes.body.data.token);
  });

  it('Deve adicionar um novo produto', async () => {
    const res = await spec()
      .post('http://lojaebac.ebaconline.art.br/api/addProduct')
      .withJson({
        name: "Fone de Ouvido Marina",
        description: "Fone Bluetooth Alta Qualidade",
        price: 150,
        category: "Eletronicos", 
        quantity: 10
      })
      .expectStatus(200);

    productId = res.body._id || (res.body.data && res.body.data._id) || (res.body.product && res.body.product._id);
    
    console.log("ID do Produto capturado:", productId);
  });

  it('Deve editar o produto criado', async () => {
    await spec()
      .put(`http://lojaebac.ebaconline.art.br/api/editProduct/${productId}`)
      .withJson({
        name: "Fone de Ouvido Marina - Pro",
        price: 199
      })
      .expectStatus(200);
  });

  it('Deve deletar o produto', async () => {
    await spec()
      .delete(`http://lojaebac.ebaconline.art.br/api/deleteProduct/${productId}`)
      .expectStatus(200);
  });
});