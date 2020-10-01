//imports
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import moment from 'moment';
import echarts from 'echarts';
import jwt from 'jwt-decode';

class Status extends Component {
  
    constructor() {
        super()
        this.state = {
            first_name: '',
            age: '',
            email: '',
            password:'',
            dob:'',
            date:'',
            daysDiff:'',
        sesscount:''
        }

        this.sessioncount=this.sessioncount.bind(this);
        var t= localStorage.getItem('usertoken')
        var decoded = jwt(t);
        this.state.first_name=decoded.identity.first_name;
        this.state.email=decoded.identity.email;
       this.state.password= decoded.identity.password
       this.state.dob= decoded.identity.dob;
        this.state.age=decoded.identity.age;
        this.state.date=decoded.identity.date;

        //Calculate No, of Days Account Registered
var f=decoded.identity.date.slice(12,16)+"-"+moment().month(this.state.date.slice(8, 11)).format("MM")+"-"+decoded.identity.date.slice(5,7);
var currdate=new Date().toISOString().slice(0,10);

var startDate = Date.parse(f);
            var endDate = Date.parse(currdate);
            var timeDiff = endDate - startDate;
             this.state.daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));


    }

    //Calculate No,of Sessions
     sessioncount(){

      var t =  localStorage.getItem("dat");
      var v= JSON.parse(t);
     
      return v.length.toString();
    
     
  
    }
    //Get All Session Dates
 dt(){
  
  var  c=[];
    
        var t = localStorage.getItem("dat");
        var v=JSON.parse(t);
        if(v.length!=0){
        for(var i=0;i<v.length;i++){
          c.push(v[i]);
        }
    

        return  c}
        else{
          return ["No Record"]
        }
      }

 //Get All Session Statuses
      st(){
       
        var  s=[];
          
              var t =localStorage.getItem("sta");
              var v=JSON.parse(t);
             if(v.length!=0){
              for(var i=0;i<v.length;i++){
                s.push(v[i]);
              }

              return  s
            }
            else{
              return [0]
            }
            }

//ComponentDidMount
    componentDidMount () {

      //Create Graph
      var st=[1,-1  ]
      var mainChart = echarts.init(document.getElementById('graph'));
      
      var option = {
                legend: {
                  left: 'center',
                  top: 'middle'
                  },
                  tooltip: {
                    trigger: 'axis',
                    textStyle: {
                    color: '#ffffff',
                  },
                  
                  axisPointer: {
                    type: 'line'
                  },
                   borderColor: '#F5847F ',
                    borderWidth: '2',
                    backgroundColor: '#F5847F' ,
                    padding: 3,
              },
                  xAxis: {
                      data:this.dt(),
                  },
                
                  yAxis: {},
                series: [{
                name: 'Status',
                type: 'line',
                color: ['#F5847F'],
                data:  this.st(),

               

                markLine: {
                  symbol: ['', ''],
                  silent: true,
                  label: {
                    normal: {
                      position: 'end',
                    },
                  },
                  lineStyle: {
                    normal: {
                      color: '#572A61',
                      type: 'solid',
                    },
                  },
                  data: [{
                    name: 'Sessions',
                    yAxis: 14
                  }]
                
                }
              }]
            
              };
      
             
              mainChart.setOption(option);
      
      
      
      //No,of Days Component
      class PercnetageCircle extends React.Component {
        constructor(props) {
          super(props);
          const percent = Math.floor(Math.max(Math.min(this.props.percent, 1000), 0));
          const percentText = this.props.duration === 0 ? percent : 0;
          this.state = {
            percentText,
            percent,
          };
        }
      
        componentDidMount() {
             //No,of Sesions Component
          $('.counter').each(function() {
            var $this = $(this),
                countTo = $this.attr('data-count');
           
            $({ countNum: $this.text()}).animate({
              countNum: countTo
            },
          
            {
          
              duration: 6000,
              easing:'linear',
              step: function() {
                $this.text(Math.floor(this.countNum));
              },
              complete: function() {
                $this.text(this.countNum);
                //alert('finished');
              }
          
            });  
            
            
          
          });

          const divide = this.props.duration / this.state.percent;
          const unit = Math.ceil(this.props.offset / divide);
          const time = this.state.percent > 0 ? divide * unit : 0;
          if (time) {
            const addPer = () => {
              const { percent, percentText } = this.state;
              this.timeout = setTimeout(() => {
                const newPercentText = percentText + unit > percent ? percent : percentText + unit;
                return this.setState({ percentText: newPercentText }, () => {
                  if (newPercentText < percent) {
                    return addPer();
                  }
                  return clearTimeout(this.timeout);
                });
              }, time);
            };
            addPer();
          }
        }
      
        componentWillUnmount() {
          clearTimeout(this.timeout);
        }
      
        timeout = null;
      
        //No, of Days Animation
        render() {
          const {
            state: { percent, percentText },
            props: {
              circleSize, duration, fontColor, circleColor, circleInnerColor,
            },
          } = this;
          const viewbox = `0 0 ${circleSize} ${circleSize}`;
          const strokeWidth = circleSize / 14;
          const diameter = circleSize - strokeWidth;
          const radius = diameter / 2;
          const circumference = 2 * Math.PI * radius;
          const fakePercent = percent === 98 || percent === 99 ? 97 : percent;
          const pCircumference = (circumference * fakePercent) / 100;
          const x = circleSize / 2;
          const y = (circleSize - diameter) / 2;
          const fontSize = circleSize / 3.73;
          const textX = circleSize / 2 - fontSize / 1.8;
          const styleSheet = document.styleSheets[0];
          styleSheet.insertRule(
            `@-webkit-keyframes progress${circleSize}{0%{stroke-dasharray: 0 ${circumference};}}`,
            styleSheet.cssRules.length,
          );
          const d = `
            M ${x} ${y}
            a ${radius} ${radius} 0 0 1 0 ${diameter}
            a ${radius} ${radius} 0 0 1 0 ${diameter * -1}
          `;
          return (
            <div
              id="progress"
              style={{
                position: 'relative',
                width: circleSize,
                height: circleSize,
              }}
            >
              <svg viewBox={viewbox} stroke={circleColor}>
                <path
                  style={{
                    fill: 'none',
                    stroke: circleInnerColor,
                    strokeWidth,
                  }}
                  d={d}
                />
                {percent && (
                  <path
                    style={{
                      fill: 'none',
                      strokeWidth,
                      strokeLinecap: 'square',
                      animation: `progress${circleSize} ${duration}ms ease-out forwards`,
                    }}
                    d={d}
                    strokeDasharray={[pCircumference, circumference]}
                  />
                )}
              </svg>
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  textAlign: 'center',
                  color: fontColor,
                  top: textX,
                  fontSize,
                }}
              >
                {percentText}
                <span style={{ fontSize: fontSize / 2 }}></span>
              </div>
            </div>
          );
        }
      }
      
      PercnetageCircle.defaultProps = {
        circleSize: 168,
        percent: this.state.daysDiff,
        duration: 1000,
        offset: 100,
        fontColor: 'rgba(0,0,0,.5)',
        circleColor: '#30b37e',
        circleInnerColor: '#d9f5ea',
      };
      
      ReactDOM.render(
        <PercnetageCircle/>,
        document.getElementById('days')
      )
            
    }
    render () {
 
        return (
           
      
            <div className="App">
            <div className="imageDiv image6"></div>
            <div className="imageDiv image6 fadeInClass"></div>
            <div className="imageDiv image6 "></div>
            <div className="imageDiv image5 fadeInClass"></div>
            <div className="row ">
<div className="col-12 col-sm-12 col-md-12 col-lg-6 "><div className="days-sess w3-hover-opacity-off"><div className="row ">
<div className="col-12 col-12 col-sm-12 col-md-12 col-lg-2">
<h3 className="day-head">Days:</h3>
</div>

<div className="col-12 col-sm-12 col-md-12 col-lg-4 ">  
<div id="days"></div>
</div>
</div></div></div>

<div className="col-12 col-sm-12 col-md-12 col-lg-6 "><div className="days-sess w3-hover-opacity-off"><div className="row ">
<div className="col-12 col-12 col-sm-12 col-md-12 col-lg-2">
<h3 className="day-head">Sessions:</h3>
</div>
<div className="col-12 col-sm-12 col-md-12 col-lg-4 ">
 <div className="sessions"><span  className="tick">&#10003;</span><div className="counter" data-count={this.sessioncount()}>0</div></div>
  </div></div></div></div>
</div>   
            <div className="row row-content1">


<div className="col-12 col-sm-12 col-md-12 col-lg-12 "><div className="main-st w3-hover-opacity-off">

<div className='label top-left down-pos'>
    <div className='content'>Positive</div>
  </div>
<div className='label top-left down-neg'>
    <div className='content'>Negative</div>
  </div>


  <div id="graph"></div>
 </div>
</div>
</div></div>
          
        )
    }
}

export default Status