const { readFile, writeFile } = require('fs').promises
// const util = require('util');
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

const start = async () => {
    try {
        const first = await readFile('D:/backend/nodeJs/content/first.txt', 'utf8')
        const second = await readFile('D:/backend/nodeJs/content/second.txt', 'utf8')
        await writeFile('D:/backend/nodeJs/content/result-mind-grenade.txt', `THIS IS AWESOME : ${first} ${second}`, { flag: 'a'}
        )
        console.log(first, second);
    } catch (error) {
        console.log(error);
    } 
}

start();

// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf8', (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })
// }

// getText('D:/backend/nodeJs/content/first.txt')
//     .then(result => console.log(result))
//     .catch(err => console.log(err))