import { storage } from '../../storage/storage';

export class Comments {
  constructor(commentsRoot, store) {
    this.commentsRoot = commentsRoot;
    this.storage = store;
    this.storage.addObserver(this);
    this.showComments();
  }

  handleEvent(message, comment) {
    if (message === 'add') {
      const c = document.createElement('li');
      const header = document.createElement('h2');
      header.textContent = `Имя: ${comment.name}`;
      const commentText = document.createElement('p');
      const date = document.createElement('span');
      const trash = document.createElement('div');
      trash.classList.add('comment__trash');
      date.textContent = `Дата: ${comment.date}`;
      commentText.textContent = `Teкст комментария: ${comment.text}`;
      c.append(header);
      c.append(commentText);
      c.append(date);
      c.append(trash);
      c.classList.add('comment');
      this.commentsRoot.append(c);
    } else if (message === 'delete') {
      console.log('delete');
    }
  }

  showComments() {
    const fragment = new DocumentFragment();
    const numberOfComments = this.storage.getComments().length;
    const comments = this.storage.getComments();
    for (let i = 0; i < numberOfComments; i += 1) {
      const comment = document.createElement('div');
      const header = document.createElement('h2');
      header.textContent = comments[i].name;
      const commentText = document.createElement('p');
      commentText.textContent = comments[i].name;
      comment.append(header);
      comment.append(commentText);
      comment.classList.add('comments__item');
      fragment.append(comment);
    }
    this.commentsRoot.append(fragment);
  }
}

document.querySelectorAll('.js-comments').forEach((commentRoot) => new Comments(commentRoot, storage));
