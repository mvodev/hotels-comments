class Storage {
  constructor() {
    this.comments = [];
    this.observers = [];
  }

  addComment(comment) {
    this.comments.push(comment);
    this.observers.forEach((o) => o.handleEvent('add', comment));
  }

  deleteComment(commentId) {
    const index = this.comments.findIndex((elem) => elem.id === commentId);
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
