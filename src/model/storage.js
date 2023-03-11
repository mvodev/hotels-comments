class Storage {
  constructor() {
    this.comments = [];
    this.observers = [];
  }

  addComment(comment) {
    this.comments.push(comment);
  }

  addLikeToComment(commentId) {
    const comment = this.comments.find((c) => c.id === +commentId);
    comment.likes += 1;
  }

  removeLikeFromComment(commentId) {
    const comment = this.comments.find((c) => c.id === +commentId);
    comment.likes -= 1;
  }

  deleteComment(commentId) {
    const index = this.comments.findIndex((elem) => elem.id === +commentId);
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
