export function getputRowData() {
  var rowData = [];

  rowData.push(
    {
      StrikePrice: "10.00",    
      PutVolatility: "39.06",
      PutDelta: "",
      PutTheta: "",
      PutGamma: "",
      putRho: "",
      putVega:""
    },
    {
      StrikePrice: "11.00",
      PutVolatility: "31.06",
      PutDelta: "",
      PutTheta: "",
      PutGamma: "",
      putRho: "",
      putVega:""
    },
    {
      StrikePrice: "11.50",
      PutVolatility: "36.06",
      PutDelta: "",
      PutTheta: "",
      PutGamma: "",
      putRho: "",
      putVega:""
    }    ,
    {
      StrikePrice: "12.00",
      PutVolatility: "39.06",
      PutDelta: "",
      PutTheta: "",
      PutGamma: "",
      putRho: "",
      putVega:""
    },
    {
      StrikePrice: "12.50",
      PutVolatility: "35.06",
      PutDelta: "",
      PutTheta: "",
      PutGamma: "",
      putRho: "",
      putVega:""
    },
    {
      StrikePrice: "13.00",
      PutVolatility: "39.06",
      PutDelta: "",
      PutTheta: "",
      PutGamma: "",
      putRho: "",
      putVega:""
    },
    {
      StrikePrice: "13.50",
      PutVolatility: "19.06",
      PutDelta: "",
      PutTheta: "",
      PutGamma: "",
      putRho: "",
      putVega:""
    },
    {
      StrikePrice: "14.00",
      PutVolatility: "21.06",
      PutDelta: "",
      PutTheta: "",
      PutGamma: "",
      putRho: "",
      putVega:""
    },
    {
      StrikePrice: "14.50",
      PutVolatility: "59.06",
      PutDelta: "",
      PutTheta: "",
      PutGamma: "",
      putRho: "",
      putVega:""
    }
    ,
    {
      StrikePrice: "15.00",
      PutVolatility: "16.06",
      PutDelta: "",
      PutTheta: "",
      PutGamma: "",
      putRho: "",
      putVega:""
    }
  );
  return rowData;
}
export function getcallRowData() {
  var rowData = [];

  rowData.push(
    {
      StrikePrice: "10.00",
      CallVolatility: "231.45",      
      CallDelta: "",
      CallTheta: "",
      CallGamma: "",
      callRho: "",
      callVega:""
    },
    {
      StrikePrice: "11.00",
      CallVolatility: "159.38",      
      CallDelta: "",
      CallTheta: "",
      CallGamma: "",
      callRho: "",
      callVega:""
    },
    {
      StrikePrice: "11.50",
      CallVolatility: "134.38",     
      CallDelta: "",
      CallTheta: "",
      CallGamma: "",
      callRho: "",
      callVega:""
    },
    {
      StrikePrice: "12.00",
      CallVolatility: "137.39",
      CallDelta: "",
      CallTheta: "",
      CallGamma: "",
      callRho: "",
      callVega:""
    },
    {
      StrikePrice: "12.50",
      CallVolatility: "184.77",
      CallDelta: "",
      CallTheta: "",
      CallGamma: "",
      callRho: "",
      callVega:""
    },
    {
      StrikePrice: "13.00",
      CallVolatility: "184.77",
      CallDelta: "",
      CallTheta: "",
      CallGamma: "",
      callRho: "",
      callVega:""
    },
    {
      StrikePrice: "13.50",
      CallVolatility: "144.77",
      CallDelta: "",
      CallTheta: "",
      CallGamma: "",
      callRho: "",
      callVega:""
    },
    {
      StrikePrice: "14.00",
      CallVolatility: "124.77",
      CallDelta: "",
      CallTheta: "",
      CallGamma: "",
      callRho: "",
      callVega:""
    },
    {
      StrikePrice: "14.50",
      CallVolatility: "141.77",
      CallDelta: "",
      CallTheta: "",
      CallGamma: "",
      callRho: "",
      callVega:""
    },
    {
      StrikePrice: "15.00",
      CallVolatility: "114.57",
      CallDelta: "",
      CallTheta: "",
      CallGamma: "",
      callRho: "",
      callVega:""
    }
  );
  return rowData;
}

export function updateCallRowData(calldata, webdata) {
  console.log("webservice response : " + webdata);

  var gridcalldata = calldata;
  var data1 = [];

  var calllen = gridcalldata.length;
  var obj = JSON.parse(webdata);

  console.log("grid length : ", calllen);

  console.log("********** - before data1 ", data1);
  for (var i = 0; i < calllen; i++) {
    if (obj[i].type === "CALL") {
      var dataobj = {
        StrikePrice: gridcalldata[i].StrikePrice,
        CallVolatility: gridcalldata[i].CallVolatility,
        CallDelta: obj[i].delta,
        CallTheta: obj[i].theta,
        CallGamma: obj[i].gamma,
        CallRho: obj[i].rho,
        CallVega: obj[i].vega
      };
    }
    data1.push(dataobj);
  }

  return data1;
}

export function updatePutRowData(putdata, len, webdata) {
  console.log("webservice response : " + webdata);

  var data1 = [];

  var putlen = putdata.length;
  var obj = JSON.parse(webdata);

  console.log("grid length : ", putlen);

  console.log("********** - before data1 ", data1);
  var j = len;
  for (var i = 0; i < putlen; i++) {
    if (obj[j].type === "PUT") {
      var dataobj = {
        StrikePrice: putdata[i].StrikePrice,
        PutVolatility: putdata[i].PutVolatility,
        PutDelta: obj[j].delta,
        PutTheta: obj[j].theta,
        PutGamma: obj[j].gamma,
        PutRho: obj[j].rho,
        PutVega: obj[j].vega
      };
      j = j+1;
    }
    data1.push(dataobj);
  }

  return data1;
}

export function getParamaeter(current, gridCallData, gridPutData) {
  var optionarray = [];

  var webparamobjcall = {
    model: current.state.selectModelOption,
    spotPrice: current.state.spotPriceTxt,
    interestRate: current.state.interstRateTxt,
    requests: []
  };

  //CALL Grid
  for (var key in gridCallData) {
    var arrayobj = {
      strikePrice: "",
      expireDate: "",
      optionType: "",
      impliedVolatility: ""
    };

    arrayobj.strikePrice = gridCallData[key].StrikePrice;
    arrayobj.expireDate = current.state.selectExpDateChange;
    arrayobj.optionType = "CALL";
    arrayobj.impliedVolatility = gridCallData[key].CallVolatility;

    optionarray.push(arrayobj);
  }

  //PUT Grid
  for (var key1 in gridPutData) {
    var arrayobj1 = {
      strikePrice: "",
      expireDate: "",
      optionType: "",
      impliedVolatility: ""
    };

    arrayobj1.strikePrice = gridCallData[key1].StrikePrice;
    arrayobj1.expireDate = current.state.selectExpDateChange;
    arrayobj1.optionType = "PUT";
    arrayobj1.impliedVolatility = gridCallData[key1].CallVolatility;

    optionarray.push(arrayobj1);
  }
  
  webparamobjcall.requests = optionarray;

  return webparamobjcall;
}
