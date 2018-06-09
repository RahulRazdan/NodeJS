const p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('This is first promise');
        //reject(new Error('Error run...'));
        resolve(1);
    });
});

const p2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('This is second promise');
        resolve(2);
    },2000);
});

const p3 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('This is third promise');
        resolve(3);
    },2000);
});

//Promise.all([p,p2,p3]).then(result => console.log(result)).catch(err=> console.log('Error',err.message));
Promise.race([p,p2,p3]).then(result => console.log(result)).catch(err=> console.log('Error',err.message));