let express = require("express")
let router=express.Router()
var testArray = []
router.get("/data", (req, res)=>{
    
    // testArray.push((Math.random() * 150).toFixed(0))
    // if (testArray.length > 10){
    //     testArray.splice(0,1)
    // }

    res.send({
        Temperature:+(Math.random() * 150).toFixed(0),
        Humidity:+(Math.random() * 200).toFixed(0),
        lightIntensity:+(Math.random() * 2500).toFixed(0),
        soilMoisture:+(Math.random() * 4000).toFixed(0),
        CO2:+(Math.random() * 4000).toFixed(0),
        // Test:testArray
    })
})

module.exports = router;
