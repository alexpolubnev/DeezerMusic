const express = require("express");
const router = express.Router();
const checkLogPas = require("./middlewares/login");
const checkUserToBd = require("./middlewares/registration");
const fetch = require("node-fetch");
const Users = require('../models/users');

/* GET home page. */
router.get("/", function(req, res) {
  res.redirect("/main");
});
router.get("/main", function(req, res) { 
  res.render("index");
});

// Registration
router.get("/registration", function(req, res) {
  res.render("registr");
});
router.post("/registration", checkUserToBd, function(req, res) {
  res.redirect("/main");
});

// Log in
router.get("/login", function(req, res) {
  res.render("login");
});
router.post("/login", checkLogPas, function(req, res) {
  res.redirect("/main");
});

// Log out
router.get("/logout", function(req, res) {
  delete req.session.user;
  res.redirect("/main");
});

router.get("/track/:id", function(req, res) {
  const track = req.params.id;
  res.render("track", {track});
});
router.get("/album/:id", function(req, res) {
  const album = req.params.id;
  res.render("album", {album});
});
router.get("/artist/:id", function(req, res) {
  const artist = req.params.id;
  res.render("artist", {artist});
});

router.get("/personal/:trackId", function(req, res) {
  const id = req.params.trackId;
  const user = req.session.user;
  console.log(id, user);
  Users.findOneAndUpdate({login:user},{$push:{tracks:id}})
  .then(response => {
    console.log(response);
    res.json();
  })
  .catch(err => {
    console.log(err);
    res.json({error: 'error'});
    });
});

router.get("/personal", async function(req, res) {
  let {user} = req.session;
  user = await Users.findOne({login:user});
  const tracks = user.tracks;
  const playList = [];
  for(let i = 0; i < tracks.length; i++){
    let element = tracks[i];
    let result = await (await fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${element}`,{
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "deaa3b41demshe62baacf17b1f37p12378bjsn88fe297726f5"
      }
    })).json();
    // const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${element}`);
    // const json = await response;

    console.log('result', result);
    result.duration = Math.floor(result.duration / 60) + ":" + (result.duration % 60);
    if (result.duration.length === 3) {
      result.duration =
        result.duration
          .split(":")
          .splice(0, 1)
          .join("") +
        ":0" +
        result.duration
          .split(":")
          .splice(1, 1)
          .join("");
    }
    playList.push(result);
  }
  // await tracks.forEach(async (element) => {
  //   const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${element}`);
  //   const json = await response;

  //   console.log('json', await json);
    
  //   playList.push(json);
  // });
  console.log(playList)
  res.render('personal', { playList })
});
module.exports = router;
