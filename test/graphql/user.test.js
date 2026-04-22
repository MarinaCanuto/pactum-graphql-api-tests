const { spec } = require("pactum");
const { like, eachLike } = require("pactum-matchers");

let token;
beforeEach(async () => {
  token = await spec()
    .post("http://lojaebac.ebaconline.art.br/graphql")
    .withGraphQLQuery(`
      mutation AuthUser($email: String, $password: String) {
        authUser(email: $email, password: $password) {
          success
          token
        }
      }
`)
  .withGraphQLVariables({
    "email": "admin@admin.com",
    "password": "admin123"
  })
  .returns('data.authUser.token')

});

it("Listagem de usuarios", async () => {
  await spec()
    .post("http://lojaebac.ebaconline.art.br/graphql")
    .withHeaders("Authorization", token)
    .withGraphQLQuery(`
      query Query {
        Users {
          id
          email
          profile {
            firstName
          }
        }
      }
    `)
    .expectStatus(200)
    .expectJsonMatch({
      data: {
        Users: eachLike({
          id: like("679f50eb0cf0a913258b286c"),
          email: like("admin@admin.com"),
        }),
      },
    });
});