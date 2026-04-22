const { spec } = require("pactum");
const { like } = require("pactum-matchers");

describe("Produtos - Teste de Contrato Seguro", () => {
  it("Deve validar o contrato de um produto específico para evitar dados nulos da base", async () => {
    const idValido = "69e7f25b053cacb0bbb35ae4";

    await spec()
      .get(`http://lojaebac.ebaconline.art.br/public/getProducts`)

      .expectStatus(200)
      .expectJsonMatch("products[0]", {
        _id: like("69e7f..."),
        name: like("TesteEdu"),
        price: like(50),
        visible: like(true),
      });
  });
});
