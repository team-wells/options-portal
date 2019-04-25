import React, { Component, PureComponent } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


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
import { getDiffCallData }  from "./data";
import { getDiffParamaeter }  from "./data";
import { updateDiffRowData }  from "./data";

const chartdata = [
  {
    name: '10', MayGard: 4.567, JQuant: 4.967, MarketPrice: 4.533,
  },
  {
    name: '10.5', MayGard: 5.678, JQuant: 6.716, MarketPrice: 5.900,
  },
  {
    name: '11', MayGard: 7.689, JQuant: 8.123, MarketPrice: 8.100,
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      calldata: getcallRowData(),
      putdata: getputRowData(),
      callDiffData: getDiffCallData(),
      spotPriceTxt: "13.22",
      selectModelOption: "MayGard",
      interstRateTxt: "8",
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
    if (event.target.name === "SelectModel"){
      
      this.setState({ selectModelOption: event.target.value });   
     // this.setState({ calldata: getcallRowData });
    //  this.setState({ putdata: getputRowData  });
    }
    if (event.target.name === "SelectExpDateChange"){
      this.setState({ selectExpDateChange: event.target.value });
    }
  };

  handleButtonChange = event =>{
    console.log("diff event");
     //call webservice
     console.log("call diff webservice");

     var url = "http://workshoploadbalancer-582707833.ap-south-1.elb.amazonaws.com:8080/cmt/workspace/compare";
     var gridcallData = this.state.calldata;
      var gridputlData = this.state.putdata;
     var webparamobjcall = getDiffParamaeter(this, gridcallData, gridputlData);

     console.log("call diff webservice", webparamobjcall);
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
            this.bindToDiffGrid(this, webdata);
            return JSON.stringify(myJson);
          })
          .catch(error => {
            console.error(error);
        });
      console.log("webservice callover...");   
 
  }

  handleSubmit = event => {
    console.log("**********before call data - ", this.state.calldata);

    //call webservice
    console.log("call webservice");

    var url = "http://WorkshopLoadBalancer-582707833.ap-south-1.elb.amazonaws.com:8080/cmt/workspace/calculate";
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
       //   console.log("webservice data .." +JSON.stringify(myJson));
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
    console.log("********** - webapiData ", data);
    var updatecallData = updateCallRowData(current.state.calldata,  data);
    var len = current.state.calldata.length;
    var updatePutData = updatePutRowData(current.state.putdata, len ,data);
   
   
    console.log("updatecallData ... *****", updatecallData);
    current.setState({ calldata: updatecallData });
    current.setState({ putdata: updatePutData  });
   
    console.log("**********after call data - ", current.state.calldata);
  }

  bindToDiffGrid = function(current, webdata){
    console.log("********** - webapiData ", webdata);
    var updatediffData = updateDiffRowData(current.state.callDiffData,  webdata);
   
    console.log("diffData ... *****", updatediffData);
    current.setState({ callDiffData: updatediffData });
   
    console.log("**********after call data - ", current.state.callDiffData);
  }

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "black" }}
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
        style={{ backgroundColor: "black" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.putdata[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
         // this.listPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.putdata[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };
  renderDiffEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.callDiffData[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
         // this.listPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.callDiffData[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };
  renderDiffEditable1 = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "black" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.callDiffData[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
         // this.listPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.callDiffData[cellInfo.index][cellInfo.column.id]
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
           
            <div
              style={{
                color: "white",
                textAlign: "left"
              }}>
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
              
                Expires:
                <select name="SelectExpDateChange" value= {this.state.selectExpDateChange} onChange={this.selecthandleChange}  style={{color: "green"}}>
                  <option>29042019</option>
                  <option>03052019</option>
                  <option>07052019</option>
                </select>
              </label>{" "}          
              <input type="submit" id="Calc" name="Calc" value="Calculate" />             
              <label></label>{" "}
              <input type="button" id= "Diff" name="Diff" value="  Price Diff  " onClick={this.handleButtonChange}/>  
              <label></label>{" "}
        </div>
        </form>
        <form>
        <div>
              <table boader='2' style={{ width:"100%"}} >
                <tbody >
                <tr>
                  <td style={{textAlign: "center", backgroundColor:'grey', color: 'white'}}>CALL OPTION</td>
                  <td style={{textAlign: "center", backgroundColor:'grey', color: 'white'}}>PUT OPTION</td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center"
                    }}
                  >
                    <ReactTable 
                      style={{textAlign: "center", color:'red', fontWeight:'bold',backgroundColor:'black', 
                      fontSize:'13px',  borderColor: 'white', height:"550px" }}
                      id="callGrid"
                      name="callGrid"
                      data={getcallRowData()}
                      showPagination={false}
                      columns  ={[
                        {
                          style : {color: 'white'},
                          Header: "Strike Price",
                          accessor: "StrikePrice",
                          Cell: this.renderEditable
                          
                        },
                        {
                          style : {color: 'white' },
                          Header: "Volatility",
                          accessor: "CallVolatility",
                          Cell: this.renderEditable
                        },
                        {
                          style : {color: 'green' },
                          Header: "Price",
                          accessor: "CallPrice",
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
                        }                       
                      ]}
                      defaultPageSize={16}
                    />
                  </td>
                  <td  style={{
                      textAlign: "center"
                    }}>
                    <ReactTable                     
                     style={{textAlign: "center", color:'red', fontWeight:'bold',backgroundColor:'black', 
                     fontSize:'13px',  borderColor: 'white', height:"550px",  }}
                      id="putgrid"
                      name="putGrid"
                      data={getputRowData()}
                      height={40}
                      showPagination={false}
                      columns={[
                        {
                          style : {color: 'white' },
                          Header: "Strike Price",
                          accessor: "StrikePrice",
                          Cell: this.renderEditable1
                        },                        
                        {
                          style : {color: 'white' },
                          Header: "Volatility",
                          accessor: "PutVolatility",
                          Cell: this.renderEditable1
                        },
                        {
                          style : {color: 'green' },
                          Header: "Price",
                          accessor: "PutPrice",
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
                        }
                      ]}
                      defaultPageSize={16}
                      className="-striped -highlight"
                    />
                   
                  </td>
                </tr>
                 <tr>
                        <td style={{
                              textAlign: "center"
                            }} >
                    <ReactTable 
                      style={{textAlign: "center", color:'red', fontWeight:'bold',backgroundColor:'black', 
                      fontSize:'13px',  borderColor: 'white' }}
                       data={getDiffCallData()}
                      showPagination={false}
                      name="calldiffTable"                  
                      columns  ={[
                        {
                          style : {color: 'green'},
                          Header: "Strike Price",
                          accessor: "dcStrikePrice",                        
                        },
                        {
                          style : {color: 'white' },
                          Header: "MarketPrice",
                          accessor: "dcPrice",
                          Cell: this.renderDiffEditable1
                        },
                        {
                          style : {color: 'green' },
                          Header: "Price(MayGard)",
                          accessor: "dcmPrice",
                          Cell: this.renderDiffEditable1
                        },
                        {
                          style : {color: 'green'},
                          Header: "Price(JQuant)",
                          accessor: "dcjPrice",
                          Cell: this.renderDiffEditable1
                        },
                        {
                          style : {color: 'blue'},
                          Header: "Diff(MayGard)",
                          accessor: "diffMcall",
                          Cell: this.renderDiffEditable1
                        },
                        {
                          style : {color: 'blue'},
                          Header: "Diff(JQuant)",
                          accessor: "diffJcall",
                          Cell: this.renderDiffEditable1
                        }
                      ]}
                      defaultPageSize={6}
                      className="-striped -highlight"
                    />
                  </td>
                  <td  style={{
                      height: "50%",
                      textAlign: "center",
                      width: "50%"
                    }}>
                        <td>   
                    <lebel>CALL</lebel>  
                      <LineChart
                            width={450}
                            height={180}
                            data={chartdata}
                            margin={{
                              top: 5, right: 5, left: 5, bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="MarketPrice" stroke="red" />
                            <Line type="monotone" dataKey="JQuant" stroke="green" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="MayGard" stroke="blue" />
                          </LineChart>
                    </td> 
                    <td>   
                    <lebel>PUT</lebel>  
                      <LineChart
                            width={450}
                            height={180}
                            data={chartdata}
                            margin={{
                              top: 5, right: 5, left: 5, bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="MarketPrice" stroke="red" />
                            <Line type="monotone" dataKey="JQuant" stroke="green" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="MayGard" stroke="blue" />
                          </LineChart>
                    </td>     
                    </td>
                    </tr>
                        </tbody>
                      </table>
                  </div>
              </form>           
      </div>
    );
  }
}




export default App;
