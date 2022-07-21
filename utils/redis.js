const redis = require("redis");

// redis-19920.c10.us-east-1-2.ec2.cloud.redislabs.com:19920
// GxI0inm3vYKLFUVnlOmIsGQa8rGo5W6s

//    Add to app.js --------------------------------------------------

// const redisCloud = async () => {
//     let redis = require("./utils/redis");
//     await redis.redisConnect();
// }
// redisCloud();
//--------------------------------------------------------------------

const client = redis.createClient({
    password: 'GxI0inm3vYKLFUVnlOmIsGQa8rGo5W6s',
    url: 'redis://redis-19920.c10.us-east-1-2.ec2.cloud.redislabs.com:19920'
});

const redisConnect = () => {
    client.on('ready', () => {
        console.log('redis is connected');
    });

    client.on('error', (err) => {
        console.log('redis is disconnected: ', err);
    });

    (async () => {
        try {
            await client.connect();
        } catch (error) {
            console.error('error while connecting redis', error);
        }
    })();
}


module.exports = {
    set: async (id, value) => await client.set(id.toString(), JSON.stringify(value)),
    get: async (id) => JSON.parse(await client.get(id.toString())),
    redisConnect,
}

