/* eslint-disable radix */
/* eslint-disable class-methods-use-this */

const listComments = async (itemId) => {
  const response = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/necgfXW8nUf9YW13OlZY/comments?item_id=${itemId}`,
  );

  const comments = await response.json();
  const commentsList = document.getElementById('comments');
  commentsList.innerHTML = '';
  const title = document.createElement('h5');
  title.style = 'text-align: center; padding: 20px 0';
  const ul = document.createElement('div');
  title.innerHTML = `<h5>Comments</h5><h5 id="counter">(${comments.length})</h5>`;
  comments.forEach((comment) => {
    ul.innerHTML += `<p style="width: 100%; display: flex; justify-content: space-between"><span><strong>${comment.username}:</strong> ${comment.comment}</span> <span>${comment.creation_date}</span</p> <br>`;
  });

  commentsList.append(title);
  commentsList.append(ul);
};

const addComment = async (itemId) => {
  const username = document.getElementById('username');
  const comment = document.getElementById('comment-text');
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/necgfXW8nUf9YW13OlZY/comments',
    {
      method: 'POST',
      body: new URLSearchParams({
        item_id: itemId,
        username: username.value,
        comment: comment.value,
      }),
    },
  );
  username.value = '';
  comment.value = '';

  listComments(itemId);
};

export default class Meal {
  constructor(name, thumbSrc, id, likes) {
    this.name = name;
    this.thumbSrc = thumbSrc;
    this.id = id;
    this.likes = likes;
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
    likeContainer.setAttribute(
      'class',
      'd-flex align-items-center color-orange',
    );
    const likeNumbers = document.createElement('span');
    likeNumbers.setAttribute('id', 'likeNumbers');
    likeNumbers.textContent = this.likes;
    const like = document.createElement('i');
    like.setAttribute('class', 'far fa-heart');
    like.setAttribute('id', this.id);
    like.addEventListener('click', this.addLike);
    likeContainer.appendChild(likeNumbers);
    likeContainer.appendChild(like);
    blockContainer.appendChild(mealName);
    blockContainer.appendChild(likeContainer);

    const btnContainer = document.createElement('div');
    btnContainer.setAttribute('class', 'd-grid gap-2 px-5 my-3');
    const btn = document.createElement('button');
    btn.addEventListener('click', this.addDetailsToTheModal);

    document
      .getElementById('closeModal')
      .addEventListener('click', this.hideModal);
    btn.setAttribute('class', 'btn btn-lg btn-primary');
    btn.setAttribute('id', this.id);

    document.querySelector('.close').addEventListener('click', this.hideModal);

    btn.textContent = 'Comments';
    btnContainer.appendChild(btn);

    mealContainer.appendChild(mealThumb);
    mealContainer.appendChild(blockContainer);
    mealContainer.appendChild(btnContainer);

    mealsContainer.appendChild(mealContainer);
  }

  hideModal() {
    this.hideModal = document.getElementById('commentsModal');
    const commentsModal = document.getElementById('commentsModal');
    commentsModal.style = 'display: none;';
  }

  async addDetailsToTheModal(e) {
    const list = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.id}`,
    );
    const body = document.querySelector('.modal-body');
    body.innerHTML = '';
    const response = await list.json();
    const mealDetails = response.meals[0];

    const img = document.createElement('img');

    const details = document.createElement('div');
    details.innerHTML = `
      <h5 style="margin-top: 15px;">Main Ingredients</h5>
      <div style="display: grid; grid-template-columns: repeat(3, auto); margin-top: 20px">
      <p>${mealDetails.strIngredient1}</p>
      <p>${mealDetails.strIngredient2}</p>
      <p>${mealDetails.strIngredient3}</p>
      <p>${mealDetails.strIngredient4}</p>
      <p>${mealDetails.strIngredient5}</p>
      <p>${mealDetails.strIngredient6}</p>
      </div>
    `;

    const commentForm = document.createElement('form');
    commentForm.style = 'display: flex; flex-direction: column; margin-top: 20px;';
    commentForm.innerHTML = `
    <h5 style="text-center">Add a comment</h5>
     <input type="text" placeholder="Your Name" id="username" style="width: 50%; margin-bottom: 20px;">
     <textarea placeholder="Your insights" id="comment-text" style="width: 75%; margin-bottom: 20px;"></textarea>
     <input type="submit" id="addComment" style="width: 100px;" class="btn btn-primary">
    `;

    const comments = document.createElement('div');
    comments.setAttribute('id', 'comments');

    document.querySelector(
      '.modal-title',
    ).innerHTML = `<span>${mealDetails.strMeal}</span>`;
    img.setAttribute('src', mealDetails.strMealThumb);
    img.setAttribute('style', 'width: 100%; height: 400px;');

    body.append(img);
    body.append(details);
    body.append(commentForm);
    body.append(comments);

    document
      .getElementById('addComment')
      .addEventListener('click', (event) => {
        event.preventDefault();
        addComment(e.target.id);
      });

    document.getElementById('commentsModal').style.display = 'block';
    listComments(e.target.id);
  }

  async addLike() {
    const mealId = this.id;
    this.previousSibling.innerHTML = parseInt(this.previousSibling.innerHTML) + 1;
    await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/necgfXW8nUf9YW13OlZY/likes',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_id: mealId }),
      },
    );
  }
}
