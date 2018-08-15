import React, {
  Component
} from 'react'
import './GraphDetails.css'

class GraphDetails extends Component {
  constructor(props) {
    super(props)
    this.buildArcs = this.buildArcs.bind(this)
    this.buildBreakPoints = this.buildBreakPoints.bind(this)
    this.buildArcsValues = this.buildArcsValues.bind(this)
    this.getArcString = this.getArcString.bind(this)
    this.getScoreStringPosition = this.getScoreStringPosition.bind(this)
    this.getBreakPointString = this.getBreakPointString.bind(this)
    this.getDashed = this.getDashed.bind(this)
    this.getCenter = this.getCenter.bind(this)
    this.getTransformation = this.getTransformation.bind(this)
  }
  componentDidMount() {

    console.log(this.props.tqScores)
  }
  buildArcs(maxDegrees, baseRadio, scoreLength, arcsDistance) {
    const arcs = Array.from({
      length: scoreLength
    })
    const theta = maxDegrees * Math.PI / 180

    const newRadio = baseRadio + arcsDistance
    return arcs.map((item, index) => {
      let P1 = {
        x: 0,
        y: baseRadio + (index * arcsDistance)
      }
      const P2 = {
        x: Math.sin(theta) * P1.y,
        y: Math.cos(theta) * P1.y,
      }
      return {
        P1,
        P2
      }
    })
  }

  buildBreakPoints(breakPointsDegrees, scoreLength, baseRadio, lastRadio, distance) {
    const breakPointsList = Object.keys(breakPointsDegrees)
    return breakPointsList.map((item) => {
      const theta = breakPointsDegrees[item] * Math.PI / 180
      const P1 = {
        x: Math.sin(theta) * (baseRadio),
        y: Math.cos(theta) * (baseRadio),
      }
      const P2 = {
        x: Math.sin(theta) * (lastRadio + distance),
        y: Math.cos(theta) * (lastRadio + distance),
      }
      return {
        P1,
        P2
      }
    })
  }

  buildArcsValues(maxPoints, maxDegrees, tqScores, arcs, distance) {
    return arcs.map((item, index) => {
      const degrees = maxDegrees * tqScores[index].value / maxPoints
      const theta = degrees * Math.PI / 180
      const y1 = item.P1.y + distance
      var end_x = Math.sin(theta) * y1
      var end_y = Math.cos(theta) * y1
      return {
        degrees,
        P1: {
          x: 0,
          y: y1
        },
        P2: {
          x: end_x,
          y: end_y
        }
      }
    })
  }

  getArcString(position) {
    return `M0,${position.P1.y} A ${position.P1.y} ${position.P1.y} 0 1 1 ${position.P2.x} ${position.P2.y}`
  }

  getScoreStringPosition(position) {
    return `M0,${position.P1.y} A ${position.P1.y} ${position.P1.y} 0 ${position.degrees > -180 ? '0' : '1'} 1 ${position.P2.x} ${position.P2.y}`
  }

  getBreakPointString(position) {
    return `M${position.P1.x}, ${position.P1.y} L ${position.P2.x},  ${position.P2.y}`
  }

  getDashed(points) {
    return Math.sqrt(Math.pow(points.P2.x - points.P1.x, 2) + Math.pow(points.P2.y - points.P1.y, 2))
  }

  getCenter(distance = 0) {
    const [x, y] = this.center.split(',')
    const scoreLength = this.tqScores.length
    const positionY = scoreLength > 3 ? parseInt(y) - ((scoreLength - 2) * this.ARC_DISTANCE) : parseInt(y)
    return `translate(${x}, ${positionY + distance})`
  }

  getTransformation(breakpoint, otherProps) {
    const [x, y] = this.center.split(',')
    const scoreLength = this.tqScores.length
    const positionY = scoreLength > 3 ? parseInt(y) - ((scoreLength - 2) * this.ARC_DISTANCE) : parseInt(y)
    return `translate(${breakpoint.P2.x + parseInt(x)}, ${breakpoint.P2.y + positionY}) ${ otherProps ? ',' + otherProps : '' }`
  }

  render() {
      const INITIAL_RADIO = -177;
      const center = '851.5,347.5'
      const DEGREES_BREAKPOINTS = {
        '0tq': 0,
        '200tq': -68.56365180816319,
        '400tq': -137.12730361632637,
        '600tq': -205.69095542448954,
        '800tq': -274.25460723265275,
        '1000tq': -342.8182590408159,
      };
      const MAX_VALUE = 1000;
      const ARC_DISTANCE = -22.5
      const tqScores = this.props.tqScores || []
      const stroke = this.props.stroke;
      const unit = this.props.unit;
      const title = this.props.title;
      const name = this.props.name;
      const scores = tqScores.map(item => item.value > MAX_VALUE ? {
        label: item.label,
        value: MAX_VALUE
      } : item)
      const maxDegrees = DEGREES_BREAKPOINTS['1000tq']
      const arcsDistance = ARC_DISTANCE
      const tqScoreLength = tqScores.length
      const baseRadio = INITIAL_RADIO - (tqScoreLength > 10 ? (tqScoreLength - 10) * arcsDistance : 0)
      const breakPointsDegrees = DEGREES_BREAKPOINTS
      const lastRadio = baseRadio + (arcsDistance * (tqScoreLength + 3))
      const renderDistance = 8

      const arcs = this.buildArcs(maxDegrees, baseRadio, tqScoreLength + 3, arcsDistance)
      const breakpoints = this.buildBreakPoints(breakPointsDegrees, tqScoreLength + 3, baseRadio, lastRadio, -10)
      const arcsForRender = arcs.slice(arcs.length - tqScoreLength)
      const scoreRender = this.buildArcsValues(1000, breakPointsDegrees['1000tq'], scores, arcsForRender, renderDistance)

      this.ARC_DISTANCE = ARC_DISTANCE
      this.tqScores = tqScores
      this.center = center

      return (
          <svg
            style={{width: '100%'}}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            id="main_svg"
            style={{opacity: 1}}
            version="1.1"
            viewBox="0 0 1803 900"
          >
        <svg style={{width: '100%'}} x={200}>
          <defs>
            <filter id="drop-shadow" x={0} y={0} width="200%" height="200%">
              <feOffset in="SourceAlpha" dx="2.5" dy="2.5" result="offOut" />
              <feGaussianBlur in="offOut" stdDeviation="2.5" result="blurOut" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
            <filter id="greyscale">
              <feColorMatrix type="matrix" dur="0.5s" values="0.4444 0.4444 0.4444 0 0 0.4444 0.4444 0.4444 0 0 0.4444 0.4444 0.4444 0 0 0 0 0 1 0" />
            </filter>
          </defs>
          <g className="timeline" transform="scale(0.8, 0.8)">
            <rect className="timeline_frame" width={1703} height={695} style={{opacity: '0.1', stroke: 'none', strokeWidth: '0.5px', cursor: 'auto'}} />
            <g className="timeline_facet">
              <rect className="timeline_facet_frame" width={1703} height={0} transform="translate(851.5,347.5)" />
              <title>{title}</title>
              <text className="facet_title" dy="-0.5em" transform="translate(851.5,40)" style={{textAnchor: 'middle'}}>{'{'}{'{'}title{'}'}{'}'}</text>
              <g className="faceted_radial_axis" transform="translate(0,25)" style={{opacity: 1}}>
                {
                  arcs.map(arc => (
                    <g className="radial_tracks QNXttvHX_2">
                      <path className="rad_track" i="'rad_track' + i" transform={this.getCenter()} d={ this.getArcString(arc) } style={{opacity: 1}} />
                    </g>
                  ))
                }
                <g className="radial_axis_tick">
                  <path className="QNXttvHX_3" transform={ this.getCenter() } style={{opacity: 1}} d={ this.getBreakPointString(breakpoints[0]) } />
                  <text textAnchor="middle" dominantBaseline="central" transform={ this.getTransformation(breakpoints[0]) } style={{opacity: 1}} y={-20}>0 {unit}</text>
                </g>
                <g className="radial_axis_tick">
                  <path className="QNXttvHX_4" transform={ this.getCenter() } d={ this.getBreakPointString(breakpoints[1]) } />
                  <text textAnchor="middle" dominantBaseline="central" transform={ this.getTransformation(breakpoints[1], 'rotate(68.5)') } style={{opacity: 1}} y={-20}>200 {unit}</text>
                </g>
                <g className="radial_axis_tick">
                  <path className="QNXttvHX_5" transform={this.getCenter()} style={{opacity: 1}} d={ this.getBreakPointString(breakpoints[2]) } />
                  <text textAnchor="middle" dominantBaseline="central" transform={ this.getTransformation(breakpoints[2],'rotate(-43)') } style={{opacity: 1}} y={20}>400 {unit}</text>
                </g>
                <g className="radial_axis_tick">
                  <path className="QNXttvHX_6" transform={this.getCenter()} style={{opacity: 1}} d={ this.getBreakPointString(breakpoints[3]) } />
                  <text textAnchor="middle" dominantBaseline="central" transform={ this.getTransformation(breakpoints[3],'rotate(26)' ) } style={{opacity: 1}} y={20}>600 {unit}</text>
                </g>
                <g className="radial_axis_tick">
                  <path className="QNXttvHX_7" transform={this.getCenter()} style={{opacity: 1}} d={ this.getBreakPointString(breakpoints[4]) } />
                  <text textAnchor="middle" dominantBaseline="central" transform={ this.getTransformation(breakpoints[4],'rotate(-86)') } style={{opacity: 1}} y={-20}>800 {unit}</text>
                </g>
                <g className="radial_axis_tick">
                <path className="QNXttvHX_8" transform={this.getCenter()} style={{opacity: 1}} d={ this.getBreakPointString(breakpoints[5]) } />
                <text textAnchor="middle" dominantBaseline="central" transform="getTransformation(breakpoints[5],'rotate(-17)')" style={{opacity: 1}} y={-20}>1000 {unit}</text>
                </g>
              </g>
            </g>
      {
            scoreRender.map(( score, i ) => (
            <g className="timeline_event_g" id={ "event_g"  + i }>
              <path className="QNXttvHX_10" transform={ this.getCenter(25) } stroke={ stroke } style={{fill: 'none', strokeWidth: 15}} d={ this.getScoreStringPosition(score) } filter="none" />
            </g>
            ))
      }
          </g>
          <svg onclick="location.href = '1_index.svg';" height={175} width={144} y={20} id="legend_panel" className="legend" x={20}>
            <rect className="legend_rect" height={135} width={119} filter="none">
              <title>Click on a color swatch to select a custom color for that category.</title>
            </rect>
            <g className="legend_element_g" transform="translate(0,57.5)">
              <title>IDENTITY</title>
              <rect className="legend_element" x={5} y={2} width={15} height={15} transform="translate(0,-35)" style={{fill: 'rgb(68, 179, 194)'}} />
              <text className="legend_element" x={25} y={10} dy={3} transform="translate(0,-35)" style={{fillOpacity: 1, display: 'inline'}}>IDENTITY</text>
            </g>
            <g className="legend_element_g" transform="translate(0,80)">
              <title>PERFORMANCE</title>
              <rect className="legend_element" x={5} y={2} width={15} height={15} transform="translate(0,-35)" style={{fill: 'rgb(228, 86, 65)'}} />
              <text className="legend_element" x={25} y={10} dy={3} transform="translate(0,-35)" style={{fillOpacity: 1, display: 'inline'}}>PERFORMANCE</text>
            </g>
            <g className="legend_element_g" transform="translate(0,102.5)">
              <title>REPUTATION</title>
              <rect className="legend_element" x={5} y={2} width={15} height={15} transform="translate(0,-35)" style={{fill: 'rgb(219, 201, 24)', stroke: 'rgb(255, 255, 255)'}} />
              <text className="legend_element" x={25} y={10} dy={3} transform="translate(0,-35)" style={{fillOpacity: 1, display: 'inline', fontWeight: 'normal', fill: 'rgb(102, 102, 102)'}}>REPUTATION</text>
            </g>
            <g className="legend_element_g" transform="translate(0,125)">
              <title>TOTAL</title>
              <rect className="legend_element" x={5} y={2} width={15} height={15} transform="translate(0,-35)" style={{fill: 'rgb(107, 103, 99)', stroke: 'rgb(255, 255, 255)'}} />
              <text className="legend_element" x={25} y={10} dy={3} transform="translate(0,-35)" style={{fillOpacity: 1, display: 'inline', fontWeight: 'normal', fill: 'rgb(102, 102, 102)'}}>TOTAL</text>
            </g>
            <g className="legend_element_g" transform="translate(0,147.5)">
              <title>VERIFIED</title>
              <rect className="legend_element" x={5} y={2} width={15} height={15} transform="translate(0,-35)" style={{fill: 'rgb(37, 209, 25)', stroke: 'rgb(255, 255, 255)'}} />
              <text className="legend_element" x={25} y={10} dy={3} transform="translate(0,-35)" style={{fillOpacity: 1, display: 'inline', fontWeight: 'normal', fill: 'rgb(102, 102, 102)'}}>VERIFIED</text>
            </g>
            <text className="legend_title" dy="1.4em" dx="0em" transform="translate(5,0)rotate(0)">LEGEND</text>
          </svg>
        </svg>
      < /svg>
    )
  }

}

export default GraphDetails
