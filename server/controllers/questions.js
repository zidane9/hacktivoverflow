const Question = require('../models/questions'),
      User = require('../models/users')
      Helpers = require('../helpers/authentication')

module.exports = {
  post : function(req, res){
    let decoded = Helpers.decodeToken(req.headers.token);
    console.log(decoded._doc);
    Question.create({
      author : decoded._doc._id,
      title : req.body.title,
      post : req.body.post,
      votes : 0,
      whoVotes : []
    },(err, data) => {
      if (err){
        res.json({success : false, data : null, msg : 'gagal cuy'})
      }
      else{
        var question = data,
            selfQuestion = data
        User.update({_id :req.body.user_id},
              {
                $push: {questions :  question._id }
              },{new : true},function (err, question) {
                if (err){
                  res.json({success : false, msg : err.message })
                }
              else{
                res.json({success : true, msg : 'success add skill' , question : selfQuestion})
              }
              })
      }

    })
  },
  getOne : function (req, res, next) {
    Question.findOne({_id: req.params.id})
    .populate('author')
    // .populate('commentList')
    .populate('answers')
    .populate('answers.user')
    .exec(function (err, question){
      if(err){
        res.json({error: err});
      } else {
        res.json(question);
      }
    })
  },
  delete : function(req, res){
    Question.findByIdAndRemove(req.params.id)
            .exec((err, question) => {
              if(err || question == null)
                res.json({success : false, msg : 'gagal cuy'})
              else{
                var data = question
                User.update( {_id : data.author}, { $pullAll: { questions : [data._id] } })
                    .exec((err, data) => {
                      if(err) res.json(err);
                      else res.json({success : true, msg : 'berhasil delete'})
                    })
              }

            })
  },
  giveVote : function(req, res){
    //
    Question.findById(req.params.id,(err , data) => {
      if (err || data == null){
          console.log('sudah');
      }else {
        let votes = data.votes;
        let whoVotes = data.whoVotes;

        let decoded = Helpers.decodeToken(req.headers.token);
        let ada = whoVotes.some(vote => vote == decoded._doc._id)
        if (ada)
          res.json({success : false, msg : 'sudah pernah ngevote cuy'})
        else{
          votes += req.body.number;
          // console.log(votes);
          Question.update({_id : data._id},
            {$push : { whoVotes : decoded._doc._id},
              votes: votes }, {new : true}
          ).exec((err, data) => {
            if (err)
              res.json({success : false, msg : err.message})
            else
              res.json({success : true, msg : 'success add vote'})
          })
        }
      }
    })
  },
  answerGiveVotes : function(req, res){

    Question.findOne({'_id' : req.params.id, 'answers._id' : req.body.answer},{'answers.$' : 1},
    (err, question) => {
      if (err || question == null){
        res.json({success : false, msg : err})
      }else {
        let decoded = Helpers.decodeToken(req.headers.token);
        let isExist = question.answers[0].whoVotes.some(x => x == decoded._doc._id)

        if (isExist){
          res.json({success : false, msg : 'you already vote'})
        }else {
          let votes = question.answers[0].votes;
          votes += req.body.number;
          Question.findOneAndUpdate({
            '_id' : req.params.id,
            'answers._id' : req.body.answer
          },{
            $push : {'answers.$.whoVotes' : decoded._doc._id},
            'answers.$.votes' : votes
            },
            {new : true}, (err, data) => {
              if (err) res.json({success : false, msg : 'gagal cuy'})
              else
                res.json({success : true, data : data})
            })
          }
      }
    })
  },

  giveAnswer : function(req, res){
    let decoded = Helpers.decodeToken(req.headers.token);
    // console.log(decoded._doc);
    // console.log('---id-',req.params.id);
    Question.findOneAndUpdate({_id : req.params.id},{
      $push : {answers : {
        user : decoded._doc._id,
        answer : req.body.answer,
        votes : 0,
        whoVotes : []
        }
      }
    },(err, data) => {
      if (err || data == null){
        res.json({success : false, msg : 'gagal cuy'})
      }else {
        // Question.populate(data, {path:"answers.user"}, function(err, question) {
        //   res.json({success : true, data:question, msg : 'sukses cuy'})
        //  });
        res.json({success : true, data:data, msg : 'sukses cuy'})
      }
    })
  },

  grabAll : function(req, res){
    Question.find({}, (err, question) => {
      console.log(err, question);
      if (err || question == null)
        res.json({success : false, msg : 'error', questions : null})
      else
        res.json({success : true, msg : 'success', questions : question})
    })
  },

  grabMyQuestion : function(req, res){
    let decoded = Helpers.decodeToken(req.headers.token);
    Question.find({author: decoded._doc._id}, (err, question) => {
      console.log(err, question);
      if (err || question == null)
        res.json({success : false, msg : 'error', questions : null})
      else
        res.json({success : true, msg : 'success', questions : question})
    })
  }


}
