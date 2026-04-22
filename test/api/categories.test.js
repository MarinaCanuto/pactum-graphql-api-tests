const { spec, request } = require("pactum");

describe("Categorias - Suíte de Testes API", () => {
  let categoryId;

  before(async () => {
    const loginRes = await spec()
      .post("http://lojaebac.ebaconline.art.br/public/authUser")
      .withJson({
        email: "admin@admin.com",
        password: "admin123",
      });

    request.setDefaultHeaders("Authorization", loginRes.body.data.token);
  });

  it("Deve adicionar uma nova categoria (POST)", async () => {
    const res = await spec()
      .post("http://lojaebac.ebaconline.art.br/api/addCategory")
      .withJson({
        name: "Eletronicos Marina",
      })
      .expectStatus(200);

    categoryId = res.body._id || (res.body.data && res.body.data._id) || (res.body.category && res.body.category._id);

    console.log("ID capturado com sucesso:", categoryId);
  });

  it("Deve editar a categoria criada (PUT)", async () => {
    await spec()
      .put(`http://lojaebac.ebaconline.art.br/api/editCategory/${categoryId}`)
      .withJson({
        name: "Eletronicos Marina Alterada",
      })
      .expectStatus(200);
  });

  it("Deve deletar a categoria (DELETE)", async () => {
    await spec()
      .delete(
        `http://lojaebac.ebaconline.art.br/api/deleteCategory/${categoryId}`,
      )
      .expectStatus(200);
  });
});
