const score = "score";
const cost = "1";
const date = "29.07.2021";
const notValidScore = "§";
const notValidCost = "s";
const index = "1";
const homeURL = "/home";
const noteURL = "/note/";
describe("example to-do app", () => {
  beforeEach(() => {
    cy.intercept("POST", "/graphql", (req) => {
      req.alias = "api";
    });
  });

  // ///////////////////////////////////////
  it("validaton ", () => {
    cy.visit(homeURL);
    cy.wait("@api");
    cy.location("pathname").should("eq", homeURL);
    cy.getId("home_page_container");
    cy.getId("add_new_note_btn").should("be.disabled");

    cy.getId("score_name").type(notValidScore);
    cy.getId("score_error_message");
    cy.getId("add_new_note_btn").should("be.disabled");
    cy.getId("score_name").clear();
    cy.getId("score_error_message").should("to.not.be.exist");

    cy.getId("score_name").clear().type(score);
    cy.getId("add_new_note_btn").should("be.disabled");
    cy.getId("score_name").clear();

    cy.getId("cost_value").type(notValidCost);
    cy.getId("cost_value_error_message").should("be.exist");
    cy.getId("add_new_note_btn").should("be.disabled");
    cy.getId("cost_value").clear();
    cy.getId("cost_value_error_message").should("to.not.be.exist");

    cy.getId("score_name").clear().type(score);
    cy.getId("cost_value").type(notValidCost);
    cy.getId("cost_value_error_message");
    cy.getId("add_new_note_btn").should("be.disabled");
  });

  // ///////////////////////////////////////
  it("request for create new note", () => {
    cy.getId("score_name").clear().type(score);
    cy.getId("cost_value").clear().type(cost);
    cy.getId("add_new_note_btn").should("be.enabled").click();
    cy.wait("@api");
    cy.getElemInto("score_name", "div", "input").should("be.empty");
    cy.getElemInto("cost_value", "div", "input").should("be.empty");
    cy.getId("add_new_note_btn").should("be.disabled");
    cy.getId("note-0").click();
    cy.wait("@api");
    cy.location("pathname").should("include", noteURL);
    cy.getId("note_container");
    cy.getId("info_about_note_body");
    cy.getId("delete_button").click();
    cy.getId("delete_modal_window");
    cy.getId("delete_button_in_modal_window").click();
    cy.wait("@api");
    cy.location("pathname").should("eq", homeURL);
    cy.getId("home_page_container");
    cy.getId("note-0").should("not.to.be.exist");
  });

  // ///////////////////////////////////////
  it("check work of custom hooks", () => {
    cy.getElemInto("score_name", "div", "input").should("be.empty").type(score);
    cy.getElemInto("cost_value", "div", "input").should("be.empty").type(cost);
    cy.getId("add_new_note_btn").should("be.enabled").click();
    cy.wait("@api");
    cy.getId("note-0").click();
    cy.wait("@api");
    cy.location("pathname").should("include", noteURL);
    cy.getId("note_container");
    cy.getId("info_about_note_body");
    cy.get("body").type("{ctrl}{r}");
    cy.getId("note_info_edit_body");
    cy.getElemInto("note_score_info_textfield", "div", "input").should(
      "have.value",
      score
    );
    cy.getElemInto("note_date_info_textfield", "div", "input").should(
      "have.value",
      date
    );
    cy.getElemInto("note_cost_info_textfield", "div", "input").should(
      "have.value",
      cost
    );
    cy.get("body").type("{ctrl}{q}");
    cy.getId("info_about_note_body");
    cy.getId("delete_button").click();
    cy.getId("delete_modal_window");
    cy.getId("delete_button_in_modal_window").click();
    cy.wait("@api");
    cy.location("pathname").should("eq", homeURL);
    cy.getId("home_page_container");
    cy.getId("note-0").should("not.to.be.exist");
  });
  // ///////////////////////////////////////
  it("check work of edit button", () => {
    cy.getElemInto("score_name", "div", "input").should("be.empty").type(score);
    cy.getElemInto("cost_value", "div", "input").should("be.empty").type(cost);
    cy.getId("add_new_note_btn").should("be.enabled").click();
    cy.wait("@api");
    cy.getId("note-0").click();
    cy.wait("@api");
    cy.location("pathname").should("include", noteURL);
    cy.getId("note_container");
    cy.getId("info_about_note_body");

    cy.getId("change_note_info_button").click();
    cy.getId("note_info_edit_body");

    cy.getElemInto("note_score_info_textfield", "div", "input").should(
      "have.value",
      score
    );
    cy.getElemInto("note_date_info_textfield", "div", "input").should(
      "have.value",
      date
    );
    cy.getElemInto("note_cost_info_textfield", "div", "input").should(
      "have.value",
      cost
    );
    cy.getId("cancel_change_button").click();
    cy.getId("info_about_note_body");
    cy.getId("delete_button").click();
    cy.getId("delete_modal_window");
    cy.getId("delete_button_in_modal_window").click();
    cy.wait("@api");
    cy.location("pathname").should("eq", homeURL);
    cy.getId("home_page_container");
    cy.getId("note-0").should("not.to.be.exist");
  });
  
  //////////////////////////////////
  it("check cancel editing after change inputs", () => {
    cy.getElemInto("score_name", "div", "input").should("be.empty").type(score);
    cy.getElemInto("cost_value", "div", "input").should("be.empty").type(cost);
    cy.getId("add_new_note_btn").should("be.enabled").click();
    cy.wait("@api");
    cy.getId("note-0").click();
    cy.wait("@api");
    cy.location("pathname").should("include", noteURL);
    cy.getId("note_container");
    cy.getId("info_about_note_body");
    cy.getId("change_note_info_button").click();
    cy.getId("note_info_edit_body");
    cy.getElemInto("note_score_info_textfield", "div", "input")
      .should("have.value", score)
      .clear();
    cy.getElemInto("note_date_info_textfield", "div", "input").should(
      "have.value",
      date
    );
    cy.getElemInto("note_cost_info_textfield", "div", "input").should(
      "have.value",
      cost
    );
    cy.getId("save_change_button").should("be.disabled");
    cy.getId("cancel_change_button").click();
    cy.getId("info_about_note_body");
    cy.getId("change_note_info_button").click();
    cy.getElemInto("note_score_info_textfield", "div", "input").should(
      "have.value",
      score
    );
    cy.getElemInto("note_date_info_textfield", "div", "input").should(
      "have.value",
      date
    );
    cy.getElemInto("note_cost_info_textfield", "div", "input").should(
      "have.value",
      cost
    );
    cy.get("body").type("{ctrl}{q}");

    cy.getId("go_to_homepage").click();
    cy.wait("@api");
    cy.getId("home_page_container");
    cy.getId("note-0").click();
    cy.wait("@api");
    cy.location("pathname").should("include", noteURL);
    cy.getId("note_container");
    cy.getId("info_about_note_body");
    cy.getId("delete_button").click();
    cy.getId("delete_modal_window");
    cy.getId("delete_button_in_modal_window").click();
    cy.wait("@api");
    cy.location("pathname").should("eq", homeURL);
    cy.getId("home_page_container");
    cy.getId("note-0").should("not.be.exist");
  });

  //////////////////////////////////
  it("check table after delete one first note", () => {
    cy.getElemInto("score_name", "div", "input").should("be.empty").type(score);
    cy.getElemInto("cost_value", "div", "input").should("be.empty").type(cost);
    cy.getId("add_new_note_btn").should("be.enabled").click();
    cy.wait("@api");
    cy.getId("note-0").click();
    cy.wait("@api");
    cy.location("pathname").should("include", noteURL);
    cy.getId("note_container");
    cy.getId("info_about_note_body");
    cy.getId("delete_button").click();
    cy.getId("delete_modal_window");
    cy.getId("delete_button_in_modal_window").click();
    cy.wait("@api");
    cy.location("pathname").should("eq", homeURL);
    cy.getId("home_page_container");
    cy.getId("note-0").should("not.be.exist");
  });
  //////////////////////////////////
  it("check note in table after edit", () => {
    cy.getElemInto("score_name", "div", "input").should("be.empty").type(score);
    cy.getElemInto("cost_value", "div", "input").should("be.empty").type(cost);
    cy.getId("add_new_note_btn").should("be.enabled").click();
    cy.wait("@api");
    cy.getId("note-0").click();
    cy.wait("@api");
    cy.location("pathname").should("include", noteURL);
    cy.getId("note_container");
    cy.getId("info_about_note_body");
    cy.getId("change_note_info_button").click();
    cy.getId("note_info_edit_body");
    cy.getElemInto("note_score_info_textfield", "div", "input")
      .should("have.value", score)
      .type(score);
    cy.getId("save_change_button").should("be.enabled").click();
    cy.wait("@api");
    cy.location("pathname").should("eq", homeURL);
    cy.getId("home_page_container");
    cy.getId("table_container");
    cy.getId("table_head_row");
    cy.getId("note-0");
    cy.getId("index_of_note_0").should("have.text", index);
    cy.getId("item_0_score_name_in_table").should("has.text", score + score);
    cy.getId("item_0_date_in_table").should("have.text", date);
    cy.getId("item_0_cost_value_in_table").should("have.text", cost);
    cy.getId("note-0").click();
    cy.wait("@api");
    cy.location("pathname").should("include", noteURL);
    cy.getId("note_container");
    cy.getId("info_about_note_body");
    cy.getId("delete_button").click();
    cy.getId("delete_modal_window");
    cy.getId("delete_button_in_modal_window").click();
    cy.wait("@api");
    cy.location("pathname").should("eq", homeURL);
    cy.getId("home_page_container");
    cy.getId("note-0").should("not.be.exist");
  });
});
