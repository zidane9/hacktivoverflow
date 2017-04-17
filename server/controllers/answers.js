const Question = require('../models/questions'),
      User = require('../models/users')
      Helpers = require('../helpers/authentication')

module.exports = {
  post : function(req, res){
    // Question.findById()
    let decoded = Helpers.decodeToken(req.headers.token);
    // console.log(decoded._doc);
    Question.findOne({_id: req.params.id})
    .populate('author')
    // .populate('commentList')
    .populate('answers')
    .exec(function (err, question){
      if(err){
        res.json({error: err});
      } else {
        question.answers.push({
          user: decoded._doc._id,
          answer: req.body.answer
        })
        question.save(err, question){
          if(err){
            res.json({error: err});
          } else {
            res.json(question);
          }
        }
      }
    })
  }


}
