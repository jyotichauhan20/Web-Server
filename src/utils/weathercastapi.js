const request = require('request')
const weathercast = (latitude, longitude,arg2)=>{
    // console.log(latitude)
    // console.log(longitude)
    const url = 'http://api.weatherstack.com/current?access_key=5abd0448849c4d22a0758781231697e9&query='+latitude+','+longitude+'&units=f'
    request({url:url,json:true},(err,{body})=>{
        if(err){
            arg2('Unable to find weathercast...here',undefined)
        }else if(body.err){
            ('Unable to find location.',undefined)
        }else{
            arg2(undefined,'It is current '+body.current.temperature+' degress out. There is a '+body.current.observation_time+' 0% chance of rain.')

            // arg2(undefined,body)
        }

    })
}
module.exports={weathercast}