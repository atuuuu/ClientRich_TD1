import Route from "@ember/routing/route";
import { action } from "@ember/object";
import ContactModel from "../models/contact";

export default class TestNewRoute extends Route {

  @action
  save(nom, prenom, mail) {
    let store = this.get("store");
/*
    let newContact = store.createRecord("contact", {
      nom: "test",
      prenom: "test",
      mail: "test"
    });
    newContact.save();*/
    let post = store.createRecord('post', {
      title: 'Rails is Omakase',
      body: 'Lorem ipsum'
    });
    post.save();

    this.display();
  }

  display() {
    let store = this.get("store");

    let test = store.findRecord('post', 1);
    console.log(test);
  }
}
