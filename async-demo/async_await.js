console.log('Before');

async function displaysRepos(){
    try{
    const user = await getUser(1);
    const repos = await getUserFromGit(user.username);
    console.log('Repos',repos);
    }catch(err){
        console.log('Error',err.message);
    }
}

displaysRepos();

console.log('After');

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