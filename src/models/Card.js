export default class Card {
  constructor(name) {
    this.id = Date.now();
    this.name = name;
    this.todos = [];
  }
}