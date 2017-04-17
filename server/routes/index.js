var express = require('express'),
    router = express.Router(),
    Question = require('../controllers/questions'),
    User = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
      })


      .delete('/questions/:id', Question.delete)

      .post('/users/register', User.register)

      .post('/users/login', User.signin)

      .get('/users', User.getAll)

      .get('/questions', Question.grabAll)

      .get('/questions/:id', Question.getOne)

      .get('/myquestions', Question.grabMyQuestion)

      .post('/questions', Question.post)

      .post('/questions/:id/votes', Question.giveVote)

      .post('/questions/:id/answers', Question.giveAnswer)

      .post('/questions/:id/answers/votes',Question.answerGiveVotes)

module.exports = router;
