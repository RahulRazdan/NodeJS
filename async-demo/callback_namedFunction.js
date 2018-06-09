console.log('Before');
getUser(1,getUserCallback);
console.log('After');

function getUserCallback(user){
    console.log(user);
    getUserFromGit(user.username,getRepos);
}

function getRepos(repos){
    console.log('repos',repos);
}

function getUser(id,callback){
    setTimeout(()=>{
        console.log('Getting USER information.');
        callback({ id : id , username : 'Rahul'});
    },2000);
}

function getUserFromGit(username,callback){
    setTimeout(()=>{
        console.log('Calling GIT HUB API');
        callback(['repo1','repo2','repo3']);
    },2000);
}