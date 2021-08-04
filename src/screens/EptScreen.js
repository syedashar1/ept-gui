import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row , Tabs , Tab , ButtonGroup , ToggleButton, Button} from 'react-bootstrap';
import Slide from 'react-reveal/Slide';
import Chart from "react-google-charts";
import Pdf from "react-to-pdf";
import pic11kv from "../images/11kv.png"
import pic66kv from "../images/66kv.png"
import pic132kv from "../images/132kv.png"
import pic220kv from "../images/220kv.png"
import piv500kv from "../images/500kv.png"
import pic765kv from "../images/765kv.png"
import './ImageUpload.css'

export default function EptScreen() {

        const ref = React.createRef();
        const options = {
                orientation: 'portrait',
                unit: 'in',
                format: [13,38]
        };
        const [VoltLevel, setVoltLevel] = useState(0)
        const [Temprature, setTemprature] = useState(25)
        const [Wind, setWind] = useState(730)

        const [Show, setShow] = useState('V')

        const [CoronaLoss, setCoronaLoss] = useState(0)
        const [PowerFactor, setPowerFactor] = useState(0.9)
        const [WeightOfConductor, setWeightOfConductor] = useState(0)
        const [Span, setSpan] = useState(0)
        const [ConductorSpacing, setConductorSpacing] = useState(250)
        const [NumOfCircuits, setNumOfCircuits] = useState(0)
        const [Tension, setTension] = useState(0)
        const [Distance, setDistance] = useState(0)
        const [RadiusOfConductor, setRadiusOfConductor] = useState(0.65)
        const [Inductance, setInductance] = useState(0)
        const [Capacitance, setCapacitance] = useState(0)
        const [Sag, setSag] = useState(0)
        const [GroundClearance, setGroundClearance] = useState(0)
        const [Resistance, setResistance] = useState(0.0898)
        const [AcsrConductor, setAcsrConductor] = useState('')
        const [InsulatorType, setInsulatorType] = useState('')
        const [NumOfPins, setNumOfPins] = useState(0)
        const [Damper, setDamper] = useState('')
        const [Model2D, setModel2D] = useState('')
        const [Height, setHeight] = useState(0)
        const [UltimateStrength, setUltimateStrength] = useState(0)
        const [DensityFactor, setDensityFactor] = useState(0)
        const [Power, setPower] = useState(0)
        const [PoleType, setPoleType] = useState('')
        const [CrossArea, setCrossArea] = useState(0)
        const [Frequency, setFrequency] = useState(50)
        const [CalculatedVoltage, setCalculatedVoltage] = useState(0)
        const [CoronaLossPer, setCoronaLossPer] = useState(0)
        const [LineEfficiency, setLineEfficiency] = useState(0)
        const [Mo, setMo] = useState(0.85)
        const [Weather, setWeather] = useState('normal')
        const [Optimize, setOptimize] = useState(false)
        const [CLRadiusImproved, setCLRadiusImproved] = useState(0)
        const [CLSpacingImproved, setCLSpacingImproved] = useState(0)
        const [ShowImage, setShowImage] = useState(false)
        const [Eng, setEng] = useState(false)
        const [Regulations, setRegulations] = useState(0)
        const [RegImpRadius, setRegImpRadius] = useState(0)
        const [RegImpSpacing, setRegImpSpacing] = useState(0)
        const [OptimizeLesser, setOptimizeLesser] = useState(false)
        

        const cg = { color : 'green' , fontSize:'17px' , fontFamily :'cursive' }





        useEffect(() => {
                
                if( VoltLevel == 11 ){ 
                        setConductorSpacing(100)
                        setRadiusOfConductor(0.2)  
                }
                if( VoltLevel == 66 ){ 
                        setConductorSpacing(150)
                        setRadiusOfConductor(0.4)  
                }
                if( VoltLevel == 132 ){ 
                        setConductorSpacing(250)
                        setRadiusOfConductor(0.5)  
                }
                if( VoltLevel == 220 ){ 
                        setConductorSpacing(550)
                        setRadiusOfConductor(0.65)
                }
                if( VoltLevel == 500 ){ 
                        setConductorSpacing(1000)
                        setRadiusOfConductor(0.85) 
                }
                if( VoltLevel == 765 ){ 
                        setConductorSpacing(1200)
                        setRadiusOfConductor(1.2) 
                }


        }, [VoltLevel ])



        const calculateHandle = (e) => {
                e.preventDefault()

                setShowImage(false)
                setOptimize(false)
                setRadiusOfConductor(Number(RadiusOfConductor))
                setConductorSpacing(Number(ConductorSpacing))
                setFrequency(Number(Frequency))
                setOptimizeLesser(false)
                


                if(Show == 'V') {
                        setPower( (VoltLevel**2/30.25 - Distance/1.6)*100 )
                }
                if(Show=='P') {
                

                setCalculatedVoltage( 5.5*(( Distance/1.6 + Power/100 )**0.5) )
                setVoltLevel(11);
                if(5.5*(( Distance/1.6 + Power/100 )**0.5) > 11.5) setVoltLevel(66);
                if(5.5*(( Distance/1.6 + Power/100 )**0.5) > 66.5) setVoltLevel(132);
                if(5.5*(( Distance/1.6 + Power/100 )**0.5) > 132.5) setVoltLevel(220);
                if(5.5*(( Distance/1.6 + Power/100 )**0.5) > 220.5) setVoltLevel(500);
                if(5.5*(( Distance/1.6 + Power/100 )**0.5) > 500.5) setVoltLevel(765);
                }       

                if(VoltLevel == 11 ){ setRegulations( 18 -(ConductorSpacing*RadiusOfConductor*0.12)) ; setRegImpRadius( 18 -(2*ConductorSpacing*RadiusOfConductor*0.12) ) }
                if(VoltLevel == 66 ){ setRegulations( 19 -(ConductorSpacing*RadiusOfConductor*0.06)) ; setRegImpRadius( 19 -(2*ConductorSpacing*RadiusOfConductor*0.06))}
                if(VoltLevel == 132 ){ setRegulations( 19 -(ConductorSpacing*RadiusOfConductor*0.02)) ;  setRegImpRadius( 19 -(2*ConductorSpacing*RadiusOfConductor*0.02))   }
                if(VoltLevel == 220 ){ setRegulations( 19 -(ConductorSpacing*RadiusOfConductor*0.01)) ; setRegImpRadius( 19 -(2*ConductorSpacing*RadiusOfConductor*0.01))  }
                if(VoltLevel == 500 ){ setRegulations( 18 -(ConductorSpacing*RadiusOfConductor*0.001)) ;  setRegImpRadius( 18 -(4*ConductorSpacing*RadiusOfConductor*0.001))  }
                if(VoltLevel == 765 ){ setRegulations( 18 -(ConductorSpacing*RadiusOfConductor*0.0005)) ; setRegImpRadius( 18 -(6*ConductorSpacing*RadiusOfConductor*0.0005)) }

                
                if( VoltLevel == 11 ){ 
                        setModel2D(pic11kv) ; setAcsrConductor('Pheasant') ; setGroundClearance(4) 
                        setInsulatorType('Pin insulator') ; setDamper('Stock Bridge damper') ; setPoleType('Reinforced concrete(RCC) Poles') ;
                        setSpan(65) ;  setCrossArea(20) ; setWeightOfConductor(0.873) ; setNumOfPins(1)  ;setTension(282.5)
                }
                if( VoltLevel == 66 ){ 
                        setModel2D(pic66kv) ; setAcsrConductor('Drake') ; setGroundClearance(14.64) 
                        setInsulatorType('Post/ strain insulator') ; setDamper('Stock Bridge damper') ; setPoleType('Latticed  Poles') ;
                        setSpan(225) ;  setCrossArea(20) ; setWeightOfConductor(0.873) ; setNumOfPins(6) ; setTension(2002.5)
                }
                if( VoltLevel == 132 ){ 
                        setModel2D(pic132kv) ; setAcsrConductor('Pheasant') ; setGroundClearance(12) 
                        setInsulatorType('Strain insulator') ; setDamper('Stock Bridge damper') ; setPoleType('Latticed  Poles') ;
                        setSpan(305) ;  setCrossArea(300) ; setWeightOfConductor(0.573) ; setNumOfPins(12) ; setTension(2002.5)
                }
                if( VoltLevel == 220 ){ 
                        setModel2D(pic220kv) ; setAcsrConductor('Drake') ; setGroundClearance(27) ; setResistance(0.0898)
                        setInsulatorType('String and suspension insulator') ; setDamper('Stock Bridge damper') ; setPoleType('Latticed  Poles') ;
                        setSpan(250) ;  setCrossArea(20) ; setWeightOfConductor(0.973) ; setNumOfPins(20) ; setTension(2282.5)
                }
                if( VoltLevel == 500 ){ 
                        setModel2D(piv500kv) ; setAcsrConductor('Ostrich') ; setGroundClearance(30) ; setResistance(0.0998)
                        setInsulatorType('suspension insulator') ; setDamper('Quadruple Spacer dampers') ; setPoleType('Lattice Steel Tower') ;
                        setSpan(400) ;  setCrossArea(20) ; setWeightOfConductor(0.973) ; setNumOfPins(46) ; setTension(3282.5)
                }
                if( VoltLevel == 765 ){ 
                        setModel2D(pic765kv) ; setAcsrConductor('Drake') ; setGroundClearance(32.5) ; setResistance(0.1098)
                        setInsulatorType('suspension insulator') ; setDamper('Stock Bridge Damper') ; setPoleType('Tabular-steel suspension tower') ;
                        setSpan(500) ;  setCrossArea(20) ; setWeightOfConductor(0.973) ; setNumOfPins(70) ; setTension(4282.5)
                }

                setSag( (WeightOfConductor*(Span**2))/(8*Tension) )

                const deq = 3*( (2*(ConductorSpacing**3))**0.5 )
                const rbar = RadiusOfConductor * 0.7788
                setCapacitance( (0.02412/Math.log10(deq/rbar)) )
                setInductance( 0.4605*(Math.log10(deq/rbar)) )

                const irr1 = 0
                const Yy =  2*3.142857*Frequency*(0.02412/Math.log10(deq/rbar))  
                const Zz = 2*3.142857*Frequency*(0.4605*(Math.log10(deq/rbar))) 

                const Vs = Yy*Zz*(2.06)
                const Vpart = (1+Vs*Zz/2)
                const is = Vs*Yy*(1+Zz/Yy/4) + (irr1*(1+Zz*Yy/2))
                const iss = Vs*Yy*(1+Zz/Yy/4) + (irr1*(1+Zz*Yy/2))
                const sendingPf = Vs*Math.pow(2) + is*Math.pow(2)
                const sendingPower = 3*Vs*is*PowerFactor
                const LineeeeEff = Power/sendingPower
                const VrAtNoLoad = Vs/1+(Zz*Yy/2)
                const rreeg = VrAtNoLoad - VoltLevel / VoltLevel








                setDensityFactor( Number(Number(0.392*Wind) / (273+Number(Temprature))) )

                const r1 = 1.2218 * Resistance * Distance 
                const ir = (Power*1000/(1.73205*VoltLevel*1000*PowerFactor) )

                const le = (Power*1000/(Power*1000 + Number(r1*3*((ir)**2)) ))
               
                console.log(r1)
                console.log(ir);
                console.log(le);

                setLineEfficiency(le)
                if(le*100<0 ) setLineEfficiency(-le)



                var eo = (2121.320344*RadiusOfConductor*DensityFactor*Mo*Math.log(ConductorSpacing/RadiusOfConductor) )/100
                
                const en = VoltLevel/3**0.5
                if(Weather=='rough') {eo = eo*0.8}
                


                if(en/eo < 1.8 ){  alert('the en/eo ratio is lesser than 1.8 , the GUI may show inappropriate results.') }

                
                setCoronaLossPer( ((243.5/DensityFactor)*( Number(Frequency) + 25)*(( en - eo )**2)*((RadiusOfConductor/ConductorSpacing)**0.5) )/100000 )
                setCoronaLoss( (((243.5/DensityFactor)*( Number(Frequency) + 25)*(( en - eo )**2)*((RadiusOfConductor/ConductorSpacing)**0.5) )/100000)*3*Distance )


                const eo1 = (2121.320344*RadiusOfConductor*2*DensityFactor*Mo*Math.log(ConductorSpacing/(RadiusOfConductor*2)) )/100
                const eo2 = (2121.320344*RadiusOfConductor*DensityFactor*Mo*Math.log((ConductorSpacing*2)/RadiusOfConductor) )/100
                

                setCLRadiusImproved( (((244/DensityFactor)*( Number(Frequency) + 25)*(( en - eo1 )**2)*(((RadiusOfConductor*2)/ConductorSpacing)**0.5) )/100000)*3*Distance )
                
                setCLSpacingImproved( (((243/DensityFactor)*( Number(Frequency) + 25)*(( en - eo2 )**2)*((RadiusOfConductor/(ConductorSpacing*2))**0.5) )/100000)*3*Distance  )


                setShowImage(true)


        }







        return (
                <div><br/><br/>
                <Container ref={ref} className='shadd' style={{background : '#dedede' , maxWidth:'1400px' , padding:'40px 20px' }} >
                <div className='' > 
                <ButtonGroup > <h1 style={{fontSize:'50px' , marginRight:'15px' ,fontFamily :'cursive'}} >Ept Gui for </h1>     
                <ToggleButton  
                key={'eng'} id={`eng`} type="radio" variant={'outline-success'} name="radio"
                checked={Eng} onClick={(e) => setEng(true)}>
                <h1>Engineer</h1>
                </ToggleButton>
                <ToggleButton
                key={'noneng'} id={`noneng`} type="radio" variant={'outline-success'} name="radio"
                checked={!Eng} onClick={(e) => setEng(false)}>
                <h1>Non Engineer</h1>
                </ToggleButton>
                </ButtonGroup> 
                </div>
                <br/>
                <hr/>

                <Row className='top'>
                <Col id='main inputs' lg='2' >
                <form onSubmit={calculateHandle} >
                <h1><b>Input Parameters</b></h1>
                <p> {Show=='V' ? 
                <> <span> Voltage Level <span style={cg}>in KV</span>: </span> <br/> <input required type='number'  onChange={e=>setVoltLevel(e.target.value)} value={VoltLevel} /> </> : 
                <><span> Power Transmitted <span style={cg}>in KW</span> : </span> <br/> <input required type='number' onChange={e=>setPower(e.target.value)} value={Power} /> </>  } 
                
                <p  variant='success' onClick={()=> { if(Show == 'V'){ setShow('P') ; return }; if(Show == 'P'){ setShow('V') ; return } }} >
                        <h5><span  style={{background:'lightgreen' , cursor:'pointer' }} >Enter {Show == 'V' ? 'Power' : 'Voltage' }</span></h5>
                </p> 
                </p>
                
                <p><span> Distance <span style={cg}>in km</span> : </span><br/><input required type='number' onChange={e=>setDistance(e.target.value)} value={Distance} /> </p>
                <p><span> Temprature <span style={cg}>in Cel</span> : </span><br/><input required type='number' onChange={e=>setTemprature(e.target.value)} value={Temprature}/> </p>
                <p><span> Wind Pressure <span style={cg}>Hg/cm</span>: </span><br/><input required type='number' onChange={e=>setWind(e.target.value)} value={Wind} /> </p>
                

                {VoltLevel > 219 && Eng && <div className='text-center' >
                <ButtonGroup>      
                <ToggleButton
                key={'smooth'} id={`radio-smooth`} type="radio" variant={'outline-success'} name="radio" value={1}
                checked={Mo === 1}
                onClick={(e) => setMo(1)}>
                <h5>Smooth Surface</h5>
                </ToggleButton>
                <ToggleButton
                key={'rough'} id={`radio-rough`} type="radio" variant={'outline-success'} name="radio" value={0.95}
                checked={Mo === 0.95}
                onClick={(e) => setMo(0.95)}>
                <h5>Rough Surface</h5>
                </ToggleButton>
                <ToggleButton
                key={'Stranded'} id={`radio-Stranded`} type="radio" variant={'outline-success'} name="radio" value={0.85}
                checked={Mo === 0.85}
                onClick={(e) => setMo(0.85)}>
                <h5>Stranded Conductor</h5>
                </ToggleButton>
                </ButtonGroup>

                <ButtonGroup >      
                <ToggleButton 
                key={'normal'} id={`radio-normal`} type="radio" variant={'outline-success'} name="radio"
                checked={Weather === 'normal'} onClick={(e) => setWeather('normal')}>
                <h5>Normal Weather</h5>
                </ToggleButton>
                <ToggleButton
                key={'smooth'} id={`radio-smooth`} type="radio" variant={'outline-success'} name="radio"
                checked={Weather === 'rough'} onClick={(e) => setWeather('rough')}>
                <h5>Rough Weather</h5>
                </ToggleButton>
                </ButtonGroup>
                </div>}
                <br/>
                <div className='text-center' >
                <Button type='submit' variant={'success'} className='btn-block' > <h1>Calculate</h1> </Button>
                </div>

                
                </form>
                </Col>
                <Col id='2D model' className='text-center'  lg='4' >
                <h1><b>Proposed Geometry</b></h1>
                { ShowImage && <div bottom>
                 <img alt='transmission image' src={Model2D || 'https://image.shutterstock.com/image-vector/add-image-vector-icon-260nw-1042853482.jpg' } 
                className='img-fluid' />  
                </div>}
                </Col>

                <Col id='outputs' lg='6' >
                <Row className='top'>
                
                <Col id='outputs 2' sm='6' >
                <h1><b>Electrical Parameters</b></h1>
                <p><span> Frequency <span style={cg}>in Hz</span> : </span> <br/> <input type='number' value={Frequency} onChange={(e)=>setFrequency(e.target.value)} /> </p>
                { Show == 'V' ? <p><span> Power Transmition <span style={cg}>in KW</span> : </span> <br/> <input type='number' value={Power} /> </p> : 
                <p><span> Voltage Level calculated <span style={cg}>in KV</span> : {' '} {CalculatedVoltage.toFixed(2)} {' '} which is closest to : </span> <br/> <input type='number' value={VoltLevel} /> </p>
                }
                <p><span> Power Factor : </span> <br/> <input type='number' value={PowerFactor}  onChange={(e)=>setPowerFactor(e.target.value)} /> </p>
                {Eng && <p><span> Resistance of Conductor <span style={cg}>in ohms</span>: </span> <br/> <input type='number' value={Resistance}  onChange={(e)=>setResistance(e.target.value)} /> </p>}
                <p><span> ACSR Conductor : </span><br/><input value={AcsrConductor} /> </p>
                <p><span> Ground Clearance <span style={cg}>in meter</span>: </span><br/><input type='number' value={GroundClearance} /> </p>
                {Eng && <p><span> Inductance <span style={cg}>in  mH/km</span>: </span> <br/> <input type='number' value={Inductance.toFixed(3)} /> </p>}
                {Eng && <p><span> Capacitance <span style={cg}>in x10-3 uC/km </span>: </span><br/><input type='number' value={(Capacitance*1000).toFixed(3)} /> </p>}
                {Eng && <p><span> Density Factor : </span> <br/> <input type='number' value={DensityFactor.toFixed(5)} /> </p>}
                <p><span> Line Efficiency <span style={cg}>in %</span>: </span> <br/> <input type='number' value={(LineEfficiency*100).toFixed(2)} /> </p>
                <p><span> Voltage Regulation <span style={cg}>in %</span>: </span> <br/> <input type='number' value={(Regulations).toFixed(2)} /> </p>
                
                {Eng && <p><span> Corona Loss  <span style={cg}>Kw / phase / Km</span> : </span> <br/> <input type='number' value={CoronaLossPer.toFixed(6)} /> </p>}
                <p><span> Corona Loss <span style={cg}>Kw </span> : </span> <br/> <input type='number' value={CoronaLoss.toFixed(4)} /> </p>
                </Col>
                <Col id='outputs 1' sm='6' >
                <h1><b>Mechanical Parameters</b></h1>
                <p><span> Pole Type : </span><br/><input value={PoleType} /> </p>
                {Eng &&  <p><span> Weight of Conductor <span style={cg}>kg/m</span> : </span> <br/> <input type='number'  value={WeightOfConductor} /> </p>} 
                {/* kg per km */}
                {Eng &&  <p><span> Crossectional Area <span style={cg}>mm-2</span>  : </span><br/><input type='number' value={CrossArea} /> </p>}
                <p><span> Radius of Conductor <span style={cg}>in Cm</span>  : </span><br/><input type='number' value={RadiusOfConductor} onChange={e=>setRadiusOfConductor(e.target.value)} /> </p>
                <p><span> Insulator Type : </span> <br/> <input  value={InsulatorType} /> </p>
                <p><span> Number of Disc : </span><br/><input type='number' value={NumOfPins} /> </p>
                {Eng &&  <p><span> Damper : </span><br/><input value={Damper} /> </p>}
                <p><span> Sag  <span style={cg}>in meters</span>  : </span> <br/> <input type='number' value ={Sag.toFixed(3)} /> </p>
                <p><span> Length of Span <span style={cg}>in meters</span> : </span> <br/> <input type='number' value ={Span} /> </p>
                {Eng &&  <p><span> Conductor Spacing <span style={cg}>in Cm</span> : </span><br/><input type='number' value={ConductorSpacing} onChange={e=>setConductorSpacing(e.target.value)}/> </p>}
                {Eng && <p><span> Distance <span style={cg}>in km</span> : </span><br/><input type='number' value={Distance} /> </p>}
                </Col>
                <Col>
                <div className='text-center' >
                {VoltLevel > 219 ? <Button  onClick={()=>setOptimize(true)} variant={'success'} > <h1>Optimize</h1> </Button> : 
                <Button onClick={()=>setOptimizeLesser(true)} variant={'success'} >  <h1>Optimize</h1> </Button> }
                {' '}<Pdf targetRef={ref} fixed={true} filename="transmission-data.pdf" options={options} x={.5} y={.5} scale={0.8} >
                {({ toPdf }) => <Button onClick={toPdf} variant={'success'} ><h1>Save</h1></Button>}
                </Pdf>
                </div>
                </Col>
                
                </Row>
                </Col>
                
                </Row>
                <br/><br/>
                {OptimizeLesser && <Container style={{background:'white',padding:'20px'}} >
                        <div style={{color:'grey' , fontSize:'35px'}} >
                        Transmission Power should be less than the SIL of the line and Power Factor Value should be near to 1
                        for maximum line efficiency .Increasing the smoothness factor decreases Corona Loss.Maximum Value of 
                        Smoothness Factor and Power Factor is 1.
                        </div>  
                </Container> }
                {Optimize && <Container style={{background:'white',padding:'20px'}} >
                <Row className='top'>
                <Col sm='1' style={{color:'grey' , fontSize:'90px'}} >1) </Col>
                <Col sm='11' >
                <div style={{color:'grey' , fontSize:'35px'}} >
                In order to optimize the system for lesser Corona Losses and Volt Regulations is to use bundled conductors that will increase the
                Radius of Conductor from <b>{RadiusOfConductor} centimeters</b> to <b>{(2*RadiusOfConductor).toFixed(3)} centimeters</b>.
                </div>
                </Col>
                </Row>
                <Row className='top'>
                <Col sm='1' style={{color:'grey' , fontSize:'90px'}} >2) </Col>
                <Col sm='11' >
                <div style={{color:'grey' , fontSize:'35px'}} >
                Second way to optimize the system for lesser Corona Losses and Volt Regulations is to increase the Spacing between the conductors for  
                <b> {ConductorSpacing} centimeters</b> to <b>{2*ConductorSpacing} centimeters</b>.
                </div>
                </Col>
                </Row>
                <br/><br/>
                <Row className="text-center">
                <Col> <p><span> Corona Loss before Optimization : </span><br/><input  value={CoronaLoss.toFixed(3)} style={{fontSize:'40px',width:'200px',color:'grey'}}  /> </p> </Col>
                <Col> <p><span> Corona Loss after Increasing Radius : </span><br/><input value={CLRadiusImproved.toFixed(3)} style={{fontSize:'40px',width:'200px',color:'grey'}}/> </p> </Col>
                <Col> <p><span> Corona Loss after Increasing Spacing bw Conductors : </span><br/><input value={CLSpacingImproved.toFixed(3)} style={{fontSize:'40px',width:'200px',color:'grey'}}/> </p> </Col>
                </Row>
                <Row className="center text-center" >
                
                
                <Col>
                <br/>
                <h1><b>Corona Loss Amount</b></h1>
                <Chart width={'1000px'} height={'600px'} chartType="Bar" loader={<div>Loading Chart</div>}
                data={[
                ['Amount', 'Kilo Watt'],
                ['Corona Loss before Optimization', CoronaLoss],
                ['Corona Loss after Increasing Radius', CLRadiusImproved],
                ['Corona Loss after Increasing Spacing bw Conductors', CLSpacingImproved],
                ]}
                options={{
                chart: { },
                }}/>
                </Col>
                <Col>
                <br/>
                <h1><b>Corona Loss Percentage</b></h1>
                <Chart width={'1000px'} height={'600px'} chartType="Bar" loader={<div>Loading Chart</div>}
                data={[
                ['Percentage', 'Corona Loss Remaining Percentage' ,'Corona Loss Reduction Percentage'],
                ['Corona Loss before Optimization', 100 ,((CoronaLoss - CoronaLoss)/CoronaLoss)*100],
                ['Corona Loss after Increasing Radius',100 - ((CoronaLoss - CLRadiusImproved)/CoronaLoss)*100 ,((CoronaLoss - CLRadiusImproved)/CoronaLoss)*100 ],
                ['Corona Loss after Increasing Spacing bw Conductors', 100 - ((CoronaLoss - CLSpacingImproved)/CoronaLoss)*100 ,((CoronaLoss - CLSpacingImproved)/CoronaLoss)*100],
                ]}
                options={{
                chart: { },
                }}/>
                </Col>

                
                <Col>
                <br/>
                <h1><b>Voltage Regulation Percentage</b></h1>
                <Chart width={'700px'} height={'600px'} chartType="Bar" loader={<div>Loading Chart</div>}
                data={[
                ['Percentage', 'Voltage Regulation %' , 'Optimized Voltage Regulation %' ],
                ['Voltage Regulation before Optimization', Regulations , Regulations - Regulations ],
                ['Voltage Regulation before Optimization', RegImpRadius , Regulations - RegImpRadius ],
                ]}
                options={{
                chart: { },
                }}/>
                </Col>


                </Row>


                </Container>}

                

                

                </Container>

                

                <br/><br/><br/><br/>
                </div>
        )
}
