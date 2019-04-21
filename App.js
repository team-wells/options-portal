import React, { Component } from "react";

import "./App.css";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./styles/ag-grid.css";
import "./styles/ag-theme-balham.css";
import { getcallRowData} from "./data";
import { getputRowData} from "./data";
import { updateCallRowData } from "./data";
import { getParamaeter } from "./data";
import { updatePutRowData } from "./data";

class App extends Component {
  constructor() {
    super();
    this.state = {
      calldata: getcallRowData(),
      putdata: getputRowData(),
      spotPriceTxt: "11713.20",
      selectModelOption: "MayGard",
      interstRateTxt: "10",
      selectExpDateChange: "29042019"
    };
  }
  
  handleChange = event => {
    if (event.target.name === "SpotPrice")
      this.setState({ spotPriceTxt: event.target.value });
    if (event.target.name === "IntRateChange")
        this.setState({ interstRateTxt: event.target.value });
  };

  selecthandleChange = event => {
    if (event.target.name === "SelectModel")
      this.setState({ selectModelOption: event.target.value });
    if (event.target.name === "SelectExpDateChange")
      this.setState({ selectExpDateChange: event.target.value });
  };

  handleSubmit = event => {
    //event.preventDefault();
    console.log("good to go..");
    
    //call webservice
    console.log("call webservice");

    var url = "http://WorkshopLoadBalancer-582707833.ap-south-1.elb.amazonaws.com:8080/cmt/workspace/calculate";

   /* var myVar = 
    {
      "model":"",
      "spotPrice":11713.20,
      "interestRate":10.0,
      "requests":[
      {
      "strikePrice":11750,
      "expireDate":"26042019",
      "optionType":"CALL",
      "impliedVolatility":13.69
      },
    {
      "strikePrice":11750,
      "expireDate":"26042019",
      "optionType":"PUT",
      "impliedVolatility":14.69
      }
      ]
    };*/
    
      var gridcallData = this.state.calldata;
      var gridputlData = this.state.putdata;
      var webparamobjcall = getParamaeter(this, gridcallData, gridputlData);


      console.log("*********Service parameter**************");
      console.log(webparamobjcall);
    
    fetch(url, 
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/Json",                 
        },
        body: JSON.stringify(webparamobjcall),
        }).then((response) => {
          return response.json();
        })
          .then((myJson) => {
          console.log("webservice data .." +JSON.stringify(myJson));
          var webdata = JSON.stringify(myJson);
          this.bindToGrid(this, webdata);
          return JSON.stringify(myJson);
        })
        .catch(error => {
          console.error(error);
      });
    console.log("webservice callover...");   
    
    event.preventDefault();
  };

  bindToGrid = function(current, data){
  //  console.log("********** - webapiData ", data);
    var updateData = updateCallRowData(current.state.calldata,  data);
    var len = current.state.calldata.length;
    var updatePutData = updatePutRowData(current.state.putdata, len ,data);
   
   
    this.setState({ calldata: updateData });
    this.setState({ putdata: updatePutData  });
   
    console.log("********** - ", this.state.calldata);
  }

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.calldata[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
          //this.listPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.calldata[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };
  renderEditable1 = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.putdata[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
          //this.listPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.putdata[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };
  render() {
    return (
      <div>     
          <form 
           style={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "black",
            height: "100%"
          }}          
          onSubmit={this.handleSubmit}>
            <h2 style={{color: 'red', height: '15px'}}
            > Capital market Workshop: VIX Pricer </h2>
            <br></br>
            <div
              style={{
                color: "white",
                textAlign: "left"
              }}            >
              <label>
                Select Model:
                <select name="SelectModel" value= {this.state.selectModelOption} onChange={this.selecthandleChange}  style={{color: "green"}}>
                  <option>Maygard</option>
                  <option>JQuant</option>                  
                </select>
              </label>{" "}
              <label>
                Spot price:
                <input
                  style={{
                    width: "80px",
                    textAlign: "center"
                  }}
                  type="text"
                  name="SpotPrice"
                  value={this.state.spotPriceTxt}
                  onChange={this.handleChange}
                />
              </label>{" "}
              <label>
                Interst Rate:
                <input
                  style={{
                    width: "40px",
                    textAlign: "center"
                  }}
                  type="text"
                  name="IntRateChange"
                  value={this.state.interstRateTxt}
                  onChange={this.handleChange}
                />
              </label>{" "}
              <label>
                Expires:
                <select name="SelectExpDateChange" value= {this.state.selectExpDateChange} onChange={this.selecthandleChange}  style={{color: "green"}}>
                  <option>29042019</option>
                  <option>03052019</option>
                  <option>07052019</option>
                </select>
              </label>{" "}          
              <input type="submit" value="Calculate" />
         
        </div>
        </form>
        
        <div>
              <table boader='2' style={{ width:"80%"}} >
                <tbody >
                <tr>
                  <td style={{textAlign: "center", backgroundColor:'orange', color: 'green'}}>CALL OPTION</td>
                  <td style={{textAlign: "center", backgroundColor:'orange', color: 'green'}}>PUT OPTION</td>
                </tr>
                <tr>
                  <td
                    style={{
                      height: "150px",
                      textAlign: "center",
                      width: "50%"
                    }}
                  >
                    <ReactTable 
                      style={{textAlign: "center", color:'red', fontWeight:'bold',backgroundColor:'black', fontSize:'13px',  borderColor: 'white' }}
                      id="callGrid"
                      name="callGrid"
                      data={getcallRowData()}
                      columns  ={[
                        {
                          style : {color: 'black'},
                          Header: "Strike Price",
                          accessor: "StrikePrice",
                          Cell: this.renderEditable
                          
                        },
                        {
                          style : {color: 'black' },
                          Header: "Volatility",
                          accessor: "CallVolatility",
                          Cell: this.renderEditable
                        },
                        {
                          style : {color: 'green' },
                          Header: "Delta",
                          accessor: "CallDelta",
                          Cell: this.renderEditable
                        },
                        {
                          style : {color: 'green'},
                          Header: "Theta",
                          accessor: "CallTheta",
                          Cell: this.renderEditable
                        },
                        {
                          style : {color: 'green'},
                          Header: "Gamma",
                          accessor: "CallGamma",
                          Cell: this.renderEditable
                        },
                        {
                          style : {color: 'green'},
                          Header: "Vega",
                          accessor: "CallVega",
                          Cell: this.renderEditable
                        },
                        {
                          style : {color: 'green'},
                          Header: "Rho",
                          accessor: "CallRho",
                          Cell: this.renderEditable
                        }
                       
                      ]}
                    />
                  </td>
                  <td  style={{
                      height: "150px",
                      textAlign: "center",
                      width: "50%"
                    }}>
                    <ReactTable                     
                     style={{textAlign: "center", color:'red', fontWeight:'bold',backgroundColor:'black', fontSize:'13px',  borderColor: 'white' }}
                      id="putgrid"
                      name="putGrid"
                      data={getputRowData()}
                      columns={[
                        {
                          style : {color: 'black' },
                          Header: "Strike Price",
                          accessor: "StrikePrice",
                          Cell: this.renderEditable1
                        },                        
                        {
                          style : {color: 'black' },
                          Header: "Volatility",
                          accessor: "PutVolatility",
                          Cell: this.renderEditable1
                        },                        
                        {
                          style : {color: 'green' },
                          Header: "Delta",
                          accessor: "PutDelta",
                          Cell: this.renderEditable1
                        },
                        {
                          style : {color: 'green'},
                          Header: "Theta",
                          accessor: "PutTheta",
                          Cell: this.renderEditable1
                        },
                        {
                          style : {color: 'green'},
                          Header: "Gamma",
                          accessor: "PutGamma",
                          Cell: this.renderEditable1
                        },
                        {
                          style : {color: 'green'},
                          Header: "Vega",
                          accessor: "PutVega",
                          Cell: this.renderEditable1
                        },
                        {
                          style : {color: 'green'},
                          Header: "Rho",
                          accessor: "PutRho",
                          Cell: this.renderEditable1
                        }
                      ]}
                    />
                   
                  </td>
                </tr>
                </tbody>
              </table>    
              </div>                 
      </div>
    );
  }
}




export default App;
