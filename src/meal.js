export default class Meal {
  constructor(name, thumbSrc, id) {
    this.name = name;
    this.thumbSrc = thumbSrc;
    this.id = id;
  }

  drawTheMeal() {
      const mealsContainer = document.getElementById('meals-container');
      const mealContainer = document.createElement('div');
      mealContainer.classList.add('col-md-6', 'col-lg-4', 'mb-3', 'px-5');

      const mealThumb = document.createElement('img');
      mealThumb.setAttribute('src', this.thumbSrc);
      mealThumb.setAttribute('class', 'figure-img img-fluid rounded mb-3');

      const blockContainer = document.createElement('div');
      blockContainer.setAttribute('class', 'd-flex justify-content-between');
      const mealName = document.createElement('h5');
      mealName.classList.add('mb-0');
      mealName.textContent = this.name;
      const likeContainer = document.createElement('div');
      likeContainer.setAttribute('class', 'd-flex align-items-center color-orange');
      const likeNumbers = document.createElement('span');
      likeNumbers.setAttribute('id', 'likeNumbers');
      const like = document.createElement('i');
      like.setAttribute('class', 'far fa-heart');
      likeContainer.appendChild(likeNumbers);
      likeContainer.appendChild(like);
      blockContainer.appendChild(mealName);
      blockContainer.appendChild(likeContainer);
      
      const btnContainer = document.createElement('div');
      btnContainer.setAttribute('class', 'd-grid gap-2 px-5 my-3');
      const btn = document.createElement('button');
      btn.setAttribute('class', 'btn btn-lg btn-primary');
      btn.textContent = 'Comments';
      btnContainer.appendChild(btn);

      mealContainer.appendChild(mealThumb);
      mealContainer.appendChild(blockContainer);
      mealContainer.appendChild(btnContainer);

      mealsContainer.appendChild(mealContainer);
  }
}
