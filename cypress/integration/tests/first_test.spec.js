describe("example to-do app", () => {
  beforeEach(() => {
    cy.intercept("POST", "/graphql", (req) => {
      req.alias = "api";
    });
  });

  it("validaton ", () => {
    cy.visit("/home"); //come to home page
    cy.wait("@api"); // wait graphql request
    cy.location("pathname").should("eq", "/home");
    cy.getId("home_page_container"); //check home page container
    cy.getId("add_new_note_btn").should("be.disabled"); // check is addButton disabled

    cy.getId("score_name").type("$");
    cy.getId("score_error_message");
    cy.getId("add_new_note_btn").should("be.disabled");
    cy.getId("score_name").clear();
    cy.getId("score_error_message").should("to.not.be.exist");

    cy.getId("score_name").clear().type("a");
    cy.getId("add_new_note_btn").should("be.disabled");
    cy.getId("score_name").clear();

    cy.getId("cost_value").type("a");
    cy.getId("cost_value_error_message").should("be.exist");
    cy.getId("add_new_note_btn").should("be.disabled");
    cy.getId("cost_value").clear();
    cy.getId("cost_value_error_message").should("to.not.be.exist");

    cy.getId("score_name").clear().type("a");
    cy.getId("cost_value").type("a");
    cy.getId("cost_value_error_message");
    cy.getId("add_new_note_btn").should("be.disabled");
  });

  it("request for create new note", () => {
    cy.getId("score_name").clear().type("a");
    cy.getId("cost_value").clear().type("1");
    cy.getId("add_new_note_btn").should("be.enabled").click();
    cy.wait("@api");
    cy.get("[data-testid=score_name] > div > input").should("be.empty");
    cy.get("[data-testid=cost_value] > div > input").should("be.empty");
    cy.getId("add_new_note_btn").should("be.disabled");
    cy.getId("note-0");
  });

  it("go to the page with info about the note", () => {
    cy.getId("note-0").click();
    cy.wait("@api");
    cy.location("pathname").should("include", "/note/");
    cy.wait(2000);
    cy.get("body").type("{ctrl}{r}");
    cy.wait(2000);
  });
});
