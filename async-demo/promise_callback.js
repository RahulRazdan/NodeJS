console.log('Before');

getUser(1)
    .then((user)=>getUserFromGit(user.username))
    .then((repos)=>console.log('repos',repos))
    .catch((err) => console.log(err.message));

getUser(1)
    .then((user)=>getUserCallback(user))
    .catch((err) => console.log(err.message));

console.log('After');

function getUserCallback(user){
    console.log(user);
    getUserFromGit(user.username)
        .then((repos) =>getRepos(repos))
        .catch((err) => console.log(err.message));
}



function getRepos(repos){
    console.log('repos',repos);
}

function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Getting USER information.');
            resolve({ id : id , username : 'Rahul'});
        },2000);
    });
    
}

function getUserFromGit(username){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Calling GIT HUB API');
            resolve(['repo1','repo2','repo3']);
        },2000);
    });
    
}