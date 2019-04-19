import React, { Component } from "react";

import "./App.css";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./styles/ag-grid.css";
import "./styles/ag-theme-balham.css";
import { getRowData} from "./data";
import { updateRowData } from "./data";
import { array } from "prop-types";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: getRowData(),
      spotPriceTxt: "11.00",
      selectModelOption: "MayGard",
      interstRateTxt: "10",
      selectExpDateChange: "23042019"
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

    /* this.state.data.push({
        callsPrice: this.state.firstName
      })*/

    console.log("select value:" + this.state.selectModel);

    //call webservice
    console.log("call webservice");

    var url = "http://13.233.149.178:8080/cmt/workspace/calculate";

    var myVar = 
    [{
      "spotPrice": 100,
      "strikePrice": 120,
      "interestRate": 10,
      "impliedVolatility": 0.1,
      "expireDate": "29042019"
      }]
    
      var gridData = this.state.data;
      var optionarray = [];
      var gridobj = {
        spotPrice:"",
        strikePrice:"",
        interestRate: "",
        impliedVolatility: "",
        expireDate: ""
      }

      for(var key in gridData){
        gridobj.spotPrice = this.state.spotPriceTxt;
        gridobj.strikePrice = gridData[key].StrikePrice;
        gridobj.interestRate = this.state.interstRateTxt;
        gridobj.expireDate = this.state.selectExpDateChange;
        gridobj.impliedVolatility = gridData[key].CallVolatility;

        optionarray.push(gridobj);
      }

      console.log("*********Service parameter**************");
      console.log(optionarray);
    
    fetch(url, 
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/Json",
          "Access-Control-Allow-Origin": "*",         
        },
        body: JSON.stringify(optionarray),
        }).then((response) => {
          return response.json();
        })
          .then((myJson) => {
          //console.log("json data .." +JSON.stringify(myJson));
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
    var updateData = updateRowData(current.state.data, data);
    current.setState(updateData);
  }

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.data[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
          //this.listPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <p>
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
                  <option />
                  <option>Black Scholes</option>
                  <option>Maygard</option>
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
                  <option>21042019</option>
                  <option>28042019</option>
                </select>
              </label>{" "}          
              <input type="submit" value="Calculate" />
              <table boader='2' style={{ width:"100%"}} >
                <tbody >
                <tr>
                  <td style={{textAlign: "center", backgroundColor:'orange', color: 'green'}}>CALL OPTION</td>
                  <td style={{textAlign: "center", backgroundColor:'orange', color: 'green'}}>PUT OPTION</td>
                </tr>
                <tr>
                  <td
                    style={{
                      height: "150px",
                      textAlign: "center"
                    }}
                  >
                    <ReactTable className='ag-theme-balham'
                      style={{textAlign: "center", fontWeight:'20px', backgroundColor:'black', color: 'white',  borderColor: 'white', height: '100%'}}
                      id="callGrid"
                      name="callGrid"
                      data={getRowData()}
                      columns  ={[
                        {
                          style : {border: '2px',color: 'green' },
                          Header: "Strike Price",
                          accessor: "StrikePrice",
                          Cell: this.renderEditable
                          
                        },
                        {
                          style : {border: '2px',color: 'green' },
                          Header: "Volatility",
                          accessor: "CallVolatility",
                          Cell: this.renderEditable
                        },
                        {
                          style : {border: '2px',color: 'black' },
                          Header: "Delta",
                          accessor: "callDelta",
                          Cell: this.renderEditable
                        },
                        {
                          style : {border: '2px',color: 'black'},
                          Header: "Theta",
                          accessor: "callTheta",
                          Cell: this.renderEditable
                        },
                        {
                          style : {border: '2px',color: 'white'},
                          Header: "Gamma",
                          accessor: "callGamma",
                          Cell: this.renderEditable
                        }
                      ]}
                    />
                  </td>
                  <td  style={{
                      height: "150px",
                      textAlign: "center"
                    }}>
                    <ReactTable  className='ag-theme-balham'                    
                      style={{textAlign: "center", backgroundColor:'black', color: 'white',  borderColor: 'white' , height: '100%'}}
                      id="putgrid"
                      name="putGrid"
                      data={data}
                      columns={[
                        {
                          style : {border: '2px',color: 'green' },
                          Header: "Strike Price",
                          accessor: "StrikePrice",
                          Cell: this.renderEditable
                        },                        
                        {
                          style : {border: '2px',color: 'green' },
                          Header: "Volatility",
                          accessor: "PutVolatility",
                          Cell: this.renderEditable
                        },                        
                        {
                          style : {border: '2px',color: 'white' },
                          Header: "Delta",
                          accessor: "putDelta",
                          Cell: this.renderEditable
                        },
                        {
                          style : {border: '2px',color: 'white', backgroundColor:'grey' },
                          Header: "Theta",
                          accessor: "putTheta",
                          Cell: this.renderEditable
                        },
                        {
                          Header: "Gamma",
                          accessor: "putGamma",
                          Cell: this.renderEditable
                        }
                      ]}
                    />
                   
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </form>
        </p>
      </div>
    );
  }
}




export default App;
