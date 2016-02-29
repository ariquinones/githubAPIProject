
var headerInput = document.querySelector(".headerInput")
var container = document.querySelector("#container")

function makeRequest (query) {
 	var baseUrl = 'https://api.github.com/users/'
 	var	profileUrl = baseUrl + query
	var repoUrl = profileUrl + '/repos'
	var promise = $.getJSON(repoUrl)
	var secondPromise = $.getJSON(profileUrl)
	promise.then(showData)
	secondPromise.then(getProfileData)
 }


var showData = function (jsonData) {
	//console.log(jsonData)
	for (var i =0; i < jsonData.length; i++) {
		var eachProject = jsonData[i]
		container.innerHTML += displayInformation(eachProject)
	}
}

var displayInformation = function(jsonData) {
	var information = '<div class="project">\
						<span class="projectName">' + jsonData.name + '</span>\
						<div class="leftInfo"><span class="language">' + jsonData.language + '</span>\
						<span class="forks"><img class="icon" src="images/forkIcon.svg">'  + jsonData.forks_count + '</span>\
						<span class="stargazers"><img class="icon" src="images/starIcon.svg">' + ' ' + jsonData.stargazers_count + '</span></div>\
						<span class="description">' + jsonData.description + '</span>\
						<span class="updated">Updated: ' + jsonData.updated_at + '</span></div>'

	return information
}

var getProfileData = function (jsonData) {
	//console.log(jsonData)
	var profileContainer = document.querySelector("#profileInformation")
	var profileInfo = '<div class="profile">\
							<img class="profilePic" src="' + jsonData.avatar_url + '">\
							<span class="name">' + jsonData.name + '</span>\
							<span class="userName">' + jsonData.login + '</span><span class="separationLine"></span>\
							<span class="location"><img class="icon" src="images/locationIcon.svg">' + '     ' + jsonData.location + '</span>\
							<span class="email"><img class="icon" src="images/emailIcon.svg">' + '     ' + jsonData.email + '</span>\
							<span class="follow">' + jsonData.followers + '<p>Followers</p></span>\
							<span class="follow">' + jsonData.following + '<p>Following</p></span>\
						</div>'

	profileContainer.innerHTML = profileInfo
}

var searchGithub = function(keyevent) {
	var userInput = keyevent.target
	if (keyevent.keyCode === 13) {
		var userSearchTerm = userInput.value 
		location.hash = userSearchTerm
		userInput.value = ''
	}
 }


var controller = function () {
	var newQuery = location.hash.substring(1)
	container.innerHTML = '' 
	makeRequest(newQuery)
}

headerInput.addEventListener("keydown",searchGithub)
window.addEventListener("hashchange",controller)
makeRequest('ariquinones')

