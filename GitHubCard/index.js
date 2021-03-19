const axios = require('axios');
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/MatthiasBakken')
  .then(function (response) {
    console.log(response.data);
})

// data:
// avatar_url: "https://avatars.githubusercontent.com/u/36183902?v=4"
// bio: "Software Engineering - Research & Development - Manufacturing - Strategy - Product Management - World Traveler - Kaizen"
// blog: "www.bakkenco.com"
// company: null
// created_at: "2018-02-06T06:05:31Z"
// email: null
// events_url: "https://api.github.com/users/MatthiasBakken/events{/privacy}"
// followers: 3
// followers_url: "https://api.github.com/users/MatthiasBakken/followers"
// following: 6
// following_url: "https://api.github.com/users/MatthiasBakken/following{/other_user}"
// gists_url: "https://api.github.com/users/MatthiasBakken/gists{/gist_id}"
// gravatar_id: ""
// hireable: true
// html_url: "https://github.com/MatthiasBakken"
// id: 36183902
// location: "Seattle, Washington"
// login: "MatthiasBakken"
// name: "Matthias Bakken"
// node_id: "MDQ6VXNlcjM2MTgzOTAy"
// organizations_url: "https://api.github.com/users/MatthiasBakken/orgs"
// public_gists: 52
// public_repos: 101
// received_events_url: "https://api.github.com/users/MatthiasBakken/received_events"
// repos_url: "https://api.github.com/users/MatthiasBakken/repos"
// site_admin: false
// starred_url: "https://api.github.com/users/MatthiasBakken/starred{/owner}{/repo}"
// subscriptions_url: "https://api.github.com/users/MatthiasBakken/subscriptions"
// twitter_username: null
// type: "User"
// updated_at: "2021-03-17T15:36:57Z"
// url: "https://api.github.com/users/MatthiasBakken"

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];
axios.get('https://api.github.com/users/MatthiasBakken/followers')
  .then(function (followers) {
    followers.data.forEach(person => {
      followersArray.push(person.login);
    })
  })
console.log(followersArray);
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function createUserCard (users) {

  users.forEach(user => {
    axios.get(`https://api.github.com/users/${user}`)
      .then(function (res) {
        const card = document.createElement("div");
        card.classList.add("card");
        const userImg = document.createElement("img");
        userImg.src = res.data.avatar_url;
        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");
        const userName = document.createElement("h3");
        userName.classList.add("name");
        userName.innerHTML = res.data.name;
        const userUserName = document.createElement("p");
        userUserName.classList.add("username");
        userUserName.innerHTML = res.data.login;
        const userLocal = document.createElement("p");
        userLocal.innerHTML = res.data.location;
        const userProfile = document.createElement("p");
        userProfile.innerHTML = "Profile: "
        const userURL = document.createElement("a");
        userURL.innerHTML = res.data.html_url;
        userURL.href = res.data.html_url;
        const followers = document.createElement("p");
        followers.innerHTML = `Followers: ${res.data.followers}`;
        const following = document.createElement("p");
        following.innerHTML = `Following: ${res.data.following}`;
        const userBio = document.createElement("p");
        userBio.innerHTML = res.data.bio;

        card.appendChild(userImg);
        card.appendChild(cardInfo);
        cardInfo.appendChild(userName);
        cardInfo.appendChild(userUserName);
        cardInfo.appendChild(userLocal);
        userProfile.appendChild(userURL);
        cardInfo.appendChild(userProfile);
        cardInfo.appendChild(followers);
        cardInfo.appendChild(following);
        cardInfo.appendChild(userBio);

        document.querySelector(".cards").appendChild(card);
      })
  })
}

createUserCard(["MatthiasBakken", "mykeal-kenny", "tetondan", "dustinmyers", "justsml"])
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
