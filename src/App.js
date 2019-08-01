import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Particles from 'react-particles-js';


class App extends Component {

constructor(props)
{
  super(props);
  this.state={
    name:'',
    rollno:''
  }

}

handleChange = (event) => {
  event.preventDefault();
  const {name,value} = event.target;
  this.setState({[name]:value});
//console.log(this.state);
}

handleSubmit = (event) => {
  console.log(this.state);
  const x=this.state;
  fetch('http://localhost:3001/',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(x)
  })
  .then(response => response.json())
  .catch(err => console.log)

}

render(){
  return (
    <div className="App">
      <div>
     <Particles className="particles"
    params={{
      "particles": {
          "number": {
              "value": 160,
              "density": {
                  "enable": false
              }
          },
          "size": {
              "value": 10,
              "random": true
          },
          "move": {
              "direction": "bottom",
              "out_mode": "out"
          },
          "line_linked": {
              "enable": false
          }
      },
      "interactivity": {
          "events": {
              "onclick": {
                  "enable": true,
                  "mode": "remove"
              }
          },
          "modes": {
              "remove": {
                  "particles_nb": 10
              }
          }
      }
  }} />
</div>


      <div className='wrapper'>
        <div className='form-wrapper'>
        <div className='head'>
        </div>
<div className="bo">
<form method='post' action='http://localhost:3001/' onSubmit={this.handleSubmit}>
              <div className='Name1'>
                <label htmlFor='name'> Enter Name: </label>
                <input className='f1' name='name' type='text' onChange={this.handleChange}/>
          
              </div>
                
                <br/>
              <div className='Rollno'>
                <label htmlFor='rollno'> Enter Rollno: </label>
                <input className='f2' name='rollno' type='text' onChange={this.handleChange}/>
              </div>
              <div className='Subject'>
                <label htmlFor='favsubject'> Enter Favourite Subject: </label>
                <input name='favsubject' type='text' onChange={this.handleChange}/>
              </div>
              <div className='button'>
                <input type='submit' onSubmit={this.handleSubmit}/>
              </div>
              
          </form>  
          
              </div>
              </div>
    </div>           
    </div>
  );

}

}

export default App;
