export function getRowData() {
    var rowData = [];
  
    rowData.push(
      {
        StrikePrice: "10.00",        
        CallVolatility: "231.45",  
        PutVolatility: "39.06",    
        CallDelta: "",
        CallTheta: "",
        CallGamma: "",
        PutDelta: "",
        PutTheta: "",
        PutGamma: ""
      },
      {
        StrikePrice: "11.00",        
        CallVolatility: "159.38",
        PutVolatility: "66.02",
        callDelta: "",
        callTheta: "",
        callGamma: ""
      },
      {
        StrikePrice: "11.50", 
        CallVolatility: "134.38",
        PutVolatility: "61.03",     
        callDelta: "",
        callTheta: "",
        callGamma: ""
      },
      {
        StrikePrice: "12.00",   
        CallVolatility: "137.39",
        PutVolatility: "55.08",       
        callDelta: "",
        callTheta: "",
        callGamma: ""
      },
      {
        StrikePrice: "12.50", 
        CallVolatility: "184.77",
        PutVolatility: "33.99",       
        callDelta: "",
        callTheta: "",
        callGamma: ""
      }
    );
    return rowData;
  }
  
 
  export function updateRowData(grid, webdata) {
    console.log("webservice response : " + webdata);


      var obj = JSON.parse(webdata);

      console.log("grid length : ", grid.length);
      console.log("webservice length : ", obj.length);

     /* for (var i in obj) {
        console.log("i : ",i);
        console.log("..data.... " + obj[i].price);

        grid[i].callDelta = obj[i].delta;
      }*/

    let i=0;

    grid.forEach(element => {
      for (let k in element) {
        //element["callDelta"] = "1.0567"; //webJson['total'];
        console.log("k : ",k);
       // console.log("..data.... "+ element["delta"]);

       element["putDelta"] = obj[i].delta;
       element["callDelta"] = obj[i+1].delta;

       i = i+1;

      }
    });

    return grid;
  }

  