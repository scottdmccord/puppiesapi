const db = require('../lib/dbConnect');

function getAllPuppies(req, res, next) {

  db.any('SELECT * from puppies ORDER BY likes DESC;')
    .then((puppies) => {
      res.puppies = puppies;
      next();
    })
    .catch(error => next(error));
}

function adoptPuppy(req, res, next) {
  // Implement adopting a puppy
  db.one(`
    INSERT INTO puppies(name, url) VALUES ($1, $2);
    `, [req.body.name, req.body.url])
  .then(() => {
    next();
  })
  .catch(error => next(error));
}

  // another way
  // db.one(`
  //   INSERT INTO puppies(name, url) VALUES ($/name/, $/url/);
  //   `, req.body)

function abandonPuppy(req, res, next) {
  console.log(req.params.id)
  // Implement abandoning the puppy :(
  db.none(`
    DELETE FROM puppies
    WHERE id = $/id/
    `, req.params)
  .then(() => {
    next();
  })
  .catch(error => next(error));
}

function likePuppy(req, res, next) {
  // Implement increasing the likes value of the puppy by one
    db.none(`
    UPDATE puppies
    SET likes = likes + 1
    WHERE id = $/id/;
    `, req.params)
  .then(() => {
    next();
  })
  .catch(error => next(error));
}


module.exports = {
  getAllPuppies,
  adoptPuppy,
  abandonPuppy,
  likePuppy
};
