const request = require('request')
const mapbox = (address,arg1)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoianlvdGljaGF1aGFuMjAiLCJhIjoiY2t6b2Y1aGV6NXlyYzJwbXpyMmhhdTNmYyJ9.pcc7ew9eKb4d1KWMoHKpcQ&limit=1'
    // console.log('we are going to use mapbox api')
    request({url,json:true},(err, {body})=>{
        if(err){
            arg1('Unable to connect the location service..',undefined)
        }else if(body.features.length===0){
            arg1('Unable to find location try with another search',undefined)

        }else{
            arg1(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name

            })
        }

    })


}
module.exports={mapbox}