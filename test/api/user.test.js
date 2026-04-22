const { spec, request } = require("pactum");
const { like, eachLike } = require("pactum-matchers");

request.setBaseUrl("http://lojaebac.ebaconline.art.br");

let token;

before(async () => {
  token = await spec()
    .post('/public/authUser')
    .withJson({
      email: "admin@admin.com",
      password: "admin123"
    })
    .returns('data.token');
});

it("API - Listagem de usuarios", async () => {
  await spec()
    .get("/api/getUsers")
    .withHeaders({
      Authorization: token
    })
    .expectStatus(200)
    .expectJsonMatch({
      users: eachLike({
        _id: like("679f50eb0cf0a913258b286c"),
        email: like("ebac.test.1775616500077@mailinator.com"),
      
      })
    });
});