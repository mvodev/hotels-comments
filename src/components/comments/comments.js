import { storage } from '../../model/storage';
import { AddCommentForm } from '../add-comment/add-comment';

export class Comments {
  constructor(commentsRoot, store) {
    this.commentsRoot = commentsRoot;
    const addCommentRoot = document.querySelector('.js-add-comment');
    this.commentForm = new AddCommentForm(addCommentRoot);
    this.commentForm.addObserver(this);
    this.storage = store;
    this.storage.addObserver(this);
    this.showComments();
  }

  handleEvent(message, comment) {
    if (message === 'add') {
      const c = document.createElement('li');
      c.setAttribute('data-id', comment.id);
      const header = document.createElement('h2');
      header.textContent = `Имя: ${comment.name}`;
      const commentText = document.createElement('p');
      const date = document.createElement('span');
      const trash = document.createElement('div');
      trash.classList.add('comment__trash');
      trash.addEventListener('pointerdown', this.handleTrash.bind(this));
      const like = document.createElement('div');
      like.classList.add('comment__like');
      like.addEventListener('pointerdown', this.handleLike.bind(this));
      date.textContent = `Дата: ${comment.date}`;
      commentText.textContent = `Teкст комментария: ${comment.text}`;
      c.append(header);
      c.append(commentText);
      c.append(date);
      c.append(trash);
      c.append(like);
      c.classList.add('comment');
      this.commentsRoot.append(c);
      this.storage.addComment(comment);
    }
  }

  handleTrash(event) {
    this.storage.deleteComment(event.target.parentElement.getAttribute('data-id'));
    this.commentsRoot.removeChild(event.target.parentElement);
  }

  // eslint-disable-next-line class-methods-use-this
  handleLike(event) {
    const id = event.target.parentElement.getAttribute('data-id');
    if (event.target.classList.contains('comment__like_is_liked')) {
      event.target.classList.remove('comment__like_is_liked');
      this.storage.removeLikeFromComment(id);
    } else {
      event.target.classList.add('comment__like_is_liked');
      this.storage.addLikeToComment(id);
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
