export class AddCommentForm {

  constructor (addCommentForm) {
    this.observers = [];
    this.addCommentForm = addCommentForm;
    this.nameError = document.querySelector('.js-add-comment__error_name_error');
    this.nameInput = document.querySelector('.js-add-comment__name');
    this.commentInput = document.querySelector('.js-add-comment__comment');
    this.commentError = document.querySelector('.js-add-comment__error_comment_error');
    this.addCommentForm.addEventListener('submit', this.handleSumbit.bind(this));
    this.commentInput.addEventListener('input',this.handleInput.bind(this));
    this.nameInput.addEventListener('input',this.handleInput.bind(this));
  }
  
  handleSumbit(event) {
    event.preventDefault();
    let errorInForm = false;
    const formData = new FormData(this.addCommentForm);
    if (formData.get('name').length === 0 ) {
      this.nameError.textContent = 'Введите имя';
      errorInForm = true;
    }
    if (formData.get('comment').length === 0){
      this.commentError.textContent = 'Введите комментарий';
      errorInForm = true;
    }

    if (errorInForm) {
      return;
    }

    const comment = {
      id: Date.now(),
      name: formData.get('name'),
      text: formData.get('comment'),
      date: formData.get('comment-date').length === 0 
            ? new Date().toDateString() 
            : new Date(formData.get('comment-date')).toDateString(), 
      likes:0,
    }
    this.observers.forEach((o) => o.handleEvent('add', comment));
  }

  handleInput (event) {
    const isNameInputChange = event.target.classList.contains('js-add-comment__name');
    const isTextInputChange = event.target.classList.contains('js-add-comment__comment');
    if (isNameInputChange) {
      this.nameError.textContent = '';
    } else if (isTextInputChange) this.commentError.textContent = '';
  }

  addObserver(o) {
    this.observers.push(o);
  }

  removeObserver(o) {
    this.observers = this.observers.filter((subscriber) => subscriber !== o);
  }

}
