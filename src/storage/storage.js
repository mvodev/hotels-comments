class Storage {
  constructor() {
    this.comments = [];
    this.observers = [];
  }

  addComment(comment) {
    this.comments.push(comment);
    this.observers.forEach((o) => o.handleEvent('add', comment));
  }

  removeComment(comment) {
    const index = this.comments.findIndex((elem) => elem.id === comment.id);
    this.comments.splice(index, 1);
  }

  getComments() {
    return this.comments;
  }

  addObserver(o) {
    this.observers.push(o);
  }

  removeObserver(o) {
    this.observers = this.observers.filter((subscriber) => subscriber !== o);
  }
}

export const storage = new Storage();
