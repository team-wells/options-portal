
export function getputRowData() {

  var rowData = [];
  return rowData;
}
export function getcallRowData() {
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
        CallDelta: "",
        CallTheta: "",
        CallGamma: "",
        PutDelta: "",
        PutTheta: "",
        PutGamma: ""
      },
      {
        StrikePrice: "11.50", 
        CallVolatility: "134.38",
        PutVolatility: "61.03",    
        CallDelta: "",
        CallTheta: "",
        CallGamma: "",
        PutDelta: "",
        PutTheta: "",
        PutGamma: ""
      },
      {
        StrikePrice: "12.00",   
        CallVolatility: "137.39",
        PutVolatility: "55.08",    
        CallDelta: "",
        CallTheta: "",
        CallGamma: "",
        PutDelta: "",
        PutTheta: "",
        PutGamma: ""
      },
      {
        StrikePrice: "12.50", 
        CallVolatility: "184.77",
        PutVolatility: "33.99",    
        CallDelta: "",
        CallTheta: "",
        CallGamma: "",
        PutDelta: "",
        PutTheta: "",
        PutGamma: ""
      }
    );
    return rowData;
  }
  
 
  export function updateRowData(calldata, putdata, webdata) {
    console.log("webservice response : " + webdata);

    var griddata =calldata;
    var data1 = [];
  
   var len = griddata.length;
   var obj = JSON.parse(webdata);

    console.log("********** - before data1 ", data1);
    for(var i=0;i<len;i++){

      if(obj[i].type)
        var dataobj = {
        StrikePrice: obj[i].strikePrice,        
        CallVolatility: obj[i].rho,  
        PutVolatility: "3sss9.06",    
        CallDelta: obj[i].delta,
        CallTheta: obj[i].theta,
        CallGamma: obj[i].gamma,
        PutDelta: "",
        PutTheta: "",
        PutGamma: ""};
        data1.push(dataobj);
    }
   

   /*   var griddata = [];
     

     // console.log("grid length : ", grid.length);
      console.log("webservice length : ", obj.length);

     /* for (var i in obj) {
        console.log("i : ",i);
        console.log("..data.... " + obj[i].price);

        grid[i].callDelta = obj[i].delta;
      }

    let i=0;
    let m=1;

    griddata.forEach(element => {
      for (let k in element) {
        //element["callDelta"] = "1.0567"; //webJson['total'];
        console.log("k : ",k);
        console.log("i : ",i);
        console.log("m : ",m);
       // console.log("..data.... "+ element["delta"]);

       var deltap = obj[i].delta;
       var deltac =obj[m].delta;
       
       console.log("obj[i].delta: ",deltap);
       console.log("obj[m].delta : ",deltac);

       element["PutDelta"] = deltap;
       element["CallDelta"] = deltac;

       //current.setState(grid);

       i = i+2;
        m = i+1;

        if(m==3)
        break;
      }
    });*/

    return data1;
  }

  