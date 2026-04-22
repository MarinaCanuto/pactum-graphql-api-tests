const { spec } = require('pactum');
const { like, eachLike } = require('pactum-matchers');

describe('Categorias - Teste de Contrato', () => {

  it('Deve validar o contrato da lista de categorias públicas', async () => {
    await spec()
      .get('http://lojaebac.ebaconline.art.br/public/getCategories')
      .expectStatus(200)
      .expectJsonMatch({
        "success": true,
        "categories": eachLike({
          "_id": like("69e91..."), 
          "name": like("Eletronicos Marina"),
        })
      });
  });
});