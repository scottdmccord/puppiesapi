function getAllPuppies() {
  return fetch('/api/puppies')
    .then(r => r.json());
}

function adoptPuppy(payload) {
  return fetch('/api/puppies', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

function likePuppy(e) {
  console.log(id);
  // Implement liking a puppy here.
  return fetch(`/api/puppies/${e}`, {
    method: 'put',
    headers: {
      'Content-Type' : 'application/json'
    },
    // body: JSON.stirngify(payload)
  });
}

function abandonPuppy() {
  // Implement abandoning a puppy here :(
}


function renderPuppies(puppies) {
  const $container = $('.adopted-puppies').empty();
  for (let i = 0; i < puppies.length; i += 1) {
    const $newPuppy = $('.puppy-template').clone();

    $newPuppy.removeClass('puppy-template')
      .addClass('puppy')
      .find('.name').text(puppies[i].name);

    $newPuppy
      .find('.likes').text(puppies[i].likes);

    $newPuppy
      .find('.abandon-puppy')
      .prop('id', puppies[i].id);

    $newPuppy
      .find('.puppy-picture img')
      .attr('src', puppies[i].url);

    // You should add a button for liking here

    $newPuppy
      .find('.buttonLike')
      .attr('name', puppies[i].id)

    // you should add a button for abandoning here

    $container.append($newPuppy);
  }
}

function registerLikeButtonHandler() {
  // implement like button listener here.
  $('.adopted-puppies').on('click', '.buttonLike', (e) => {
    likePuppy(e.currentTarget.name);
  })
}

function registerAbandonButtonHandler() {
  // implement abandon button listener here. :(
}


function registerFormHandler() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const $form = $(this);
    const puppy = {
      name: $form.find('[name=name]').val(),
      url: $form.find('[name=url]').val()
    };

    adoptPuppy(puppy).then(() => {
      getAllPuppies().then(renderPuppies);
    });
  });
}


$(() => {
  registerFormHandler();
  registerLikeButtonHandler();
  registerAbandonButtonHandler();
  getAllPuppies().then(renderPuppies);
});
