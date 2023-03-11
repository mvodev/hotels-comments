import { AddCommentForm } from '../add-comment/add-comment';
import { Storage } from '../../model/storage';

export class Comments {
  constructor(commentsRoot) {
    this.commentsRoot = commentsRoot;
    const addCommentFormRoot = document.querySelector('.js-add-comment');
    this.commentForm = new AddCommentForm(addCommentFormRoot);
    this.commentForm.addObserver(this);
    this.storage = new Storage();
    this.storage.addObserver(this);
  }

  handleEvent(message, comment) {
    if (message === 'add') {
      let dateToShow = '';
      const actualDate = new Date();
      const actualDay = actualDate.getDate();
      const actualMonth = actualDate.getMonth();
      const actualYear = actualDate.getFullYear();
      const commentDate = new Date(comment.date);
      const commentYear = commentDate.getFullYear();
      const commentMonth = commentDate.getMonth();
      const commentDay = commentDate.getDate();
      const commentDateToShow = `${commentDay < 10 ? `0${commentDay}` : commentDay}.${commentMonth < 10 ? `0${commentMonth + 1}` : commentMonth + 1}.${commentYear}`;
      const commentHours = commentDate.getHours() < 10 ? `0${commentDate.getHours()}` : commentDate.getHours();
      const commentMinutes = commentDate.getMinutes() < 10 ? `0${commentDate.getMinutes()}` : commentDate.getMinutes();
      if (commentYear === actualYear && commentMonth === actualMonth) {
        if (actualDay - commentDay === 1) {
          dateToShow = `вчера ${commentHours}:${commentMinutes}`;
        } else if (commentDay === actualDay) {
          dateToShow = `сегодня ${commentHours}:${commentMinutes}`;
        } else dateToShow = `${commentDateToShow}`;
      } else dateToShow = `${commentDateToShow}`;
      console.log(commentDate);
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
      date.textContent = `Дата: ${dateToShow}`;
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
}

document.querySelectorAll('.js-comments').forEach((commentRoot) => new Comments(commentRoot));
