import cron from 'cron';
import https from 'https';

const job = new cron.CronJob("*/10 * * * *",function(){
    https.get(process.env.API_URL, (res)=> {
        if(res.statusCode === 200){
            console.log("cron request sended successfully");
        }else{
            console.log("cron request not send");
        }
    }).on("error", (e)=> console.error("Error while sending request ", e));
})

export default job