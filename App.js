import React, { Component } from "react";

import "./App.css";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import './styles/ag-grid.css';
import './styles/ag-theme-balham.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: getRowData(),
      spotPrice: "",
      selectModel: ""
    };
  }
  handleChange = event => {
    if (event.target.name === "SpotPrice")
      this.setState({ spotPrice: event.target.value });
    //if (event.target.name === "lastName")
      //this.setState({ lastName: event.target.value });
  };

  selecthandleChange = event => {
    if (event.target.name === "Model")
      this.setState({ selectModel: event.target.value });
    //if (event.target.name === "lastName")
      //this.setState({ lastName: event.target.value });
  };

  

  handleSubmit = event => {
    //event.preventDefault();
    console.log("good to go..");

     /* this.state.data.push({
        callsPrice: this.state.firstName
      })*/

      console.log("select value:" + this.state.selectModel );

    //call webservice
    console.log("call webservice");
    var url = "https://reqres.in/api/users";

   fetch(url)
    .then(results =>{
      console.log("good...");
      return results.json();
    }).then (webdata=>{
      console.log(webdata);
      //data1
      //update the grid data from webservice
      this.setState(updateRowData(this.state.data,webdata));
    })

    
   
    console.log(this.state.data);
    event.preventDefault();


  };

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
      <div className="theme-blue">     
        <p className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <h3>VIX Pricing</h3>
            <div style={{
                width: '450px',
                textAlign:'left'
                 } }>
            <label>
              Select Model:
              <select 
                name="Model"               
                onChange={this.selecthandleChange}>
                 <option></option>
                <option>Black Scholes</option>
                <option>Maygard</option>
              </select>
            </label>{" "}
            </div>
            <div style={{
                width: '450px',
                textAlign:'left'
                 } }>
            <label >
              Spot price:
              <input 
              style={{
                width: '50px',
                textAlign:'center'
                 } }
                type="text"
                name="SpotPrice"
                value={this.state.spotPrice}
                onChange={this.handleChange}
              />
            </label>{" "}
            <input type="submit" value="Calculate" />
            </div>
          </form>
        </p>
        <div className="ag-theme-balham"
        style={{
          height: '300px',
          width: '700px',
          textAlign:'center'
         } }>
          <label>CALL Option
          <ReactTable id="callGrid" name="callGrid"
          
            data={data}
            columns={[  
              {
                Header: "Strike Price",
                accessor: "callsPrice",
                Cell: this.renderEditable
              },
              {
                Header: "Volatility",
                accessor: "callVolatility",
                Cell: this.renderEditable
              },
              {
                Header: "TimetoExpire",
                accessor: "calltimetoExpire",
                Cell: this.renderEditable
              },
              {
                Header: "Int. Rate",
                accessor: "callintRate",
                Cell: this.renderEditable
              },
              {
                Header: "Delta",
                accessor: "callDelta"
              },
              {
                Header: "Theta",
                accessor: "callTheta"
              },
              {
                Header: "Gamma",
                accessor: "callGamma"
              },

              /*{
                Header: "Full Name",
                id: "full",
                accessor: d => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: d.firstName + " " + d.lastName
                    }}
                  />
                )
              }*/
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          </label>
        </div>
      </div>
    );
  }
}

function getRowData(){

  var rowData = [];

  rowData.push({
    callsPrice:"100.34",
    callVolatility: "3000.43",
    callDelta:"",
    callTheta: "",
    callGamma:""
  },
  {
    callsPrice:"102.34",
    callVolatility: "3001.43",
    callDelta:"",
    callTheta: "",
    callGamma:""
  }
  );
  return rowData;

}

function updateRowData(gridJson, webJson ){
  console.log("update data : "+webJson); 

  gridJson.forEach(element => {
    for(let k in element){     
      element['callDelta']= webJson['total'];
    }    
  });
  return gridJson;
}
  
export default App;