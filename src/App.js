import React, {
  Component
} from 'react';
import logo from './images/q_icon.png'
import DynamicField from './DynamicField'
import GraphDetails from './GraphDetails'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import './css/app.css';
import './css/bootstrap.min.css';
import './css/fa-svg-with-js.css';
import * as math from 'mathjs'

const strokes = {
  reputation: 'rgb(68, 179, 194)',
  identify: 'rgb(219, 201, 24)',
  perfomance: 'rgb(228, 86, 65)'
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      workexperence: [],
      open: false,
      education: [],
      skills: [],
      social: [],
      misc: [],
      reputation: [],
      scores: {
        reputation: [],
        identity: [],
        perfomance: [],
        total: 0
      }
    }
    this.onChange = this.onChange.bind(this)
    this.calculateScores = this.calculateScores.bind(this)
    this.setScoreValues = this.setScoreValues.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  onChange(name) {
    return value => {
      this.setState({
        [name]: value
      })
    }
  }

  calculateScores(type) {
    const {
      workexperence,
      skills,
      social,
      misc,
      reputation,
      education
    } = this.state
    const formSections = [skills, social, workexperence, reputation, education].filter(item => item.length > 0)
    const fromExperience = workexperence.map(item => parseInt(item.value.from.split('-')[0]))
    const toExperience = workexperence.map(item => parseInt(item.value.to.split('-')[0]))
    const yearsOfExperience = Math.max(...toExperience) - Math.min(...fromExperience)

    const baseValues = {
      reputation: {
        yearsOfExperience: 5,
        skills: 2,
        reputation
      },
      identity: {
        social: 5,
        profileInformation: 10,
        education: 15,
        misc: 10
      },
      perfomance: {
        yearsOfExperience: 10,
        skills: 5
      }
    }

    const calculate = {
      reputation: () => Object.keys(baseValues.reputation).map(item => {
        const toCalculate = baseValues.reputation[item]
        const scores = {
          reputation: () => toCalculate.length > 1 ? math.sum(...toCalculate.map(item => parseInt(item.value.source))) :
            (toCalculate[0] ? toCalculate[0].value.source : 0),
          yearsOfExperience: () => yearsOfExperience * toCalculate,
          skills: () => skills.length > 1 ? math.sum(...skills.map(item => parseInt(item.value['skill-level']))) + (skills.length * toCalculate) :
            (skills[0] ? parseInt(skills[0].value['skill-level']) : 0),

        }
        return {
          label: item,
          value: scores[item]()
        }
      }),
      identity: () => Object.keys(baseValues.identity).map(item => {
        const toCalculate = baseValues.identity[item]
        const scores = {
          social: () => (
            toCalculate * social.length + (
              social.length > 1 ?
              math.sum(...social.map(item => parseInt(item.value.network))) :
              (social[0] ? parseInt(social[0].value.network) : 0)
            )
          ),
          profileInformation: () => formSections.length * toCalculate,
          education: () => (
            (toCalculate * education.length) + (
              education.length > 1 ?
              math.sum(...education.map(item => parseInt(item.value.degree))) :
              (education[0] ? parseInt(education[0].value.degree) : 0)
            )
          ),
          misc: () => (
            toCalculate + misc.length + (
              misc.length > 1 ?
              math.sum(...misc.map(item => item.value.membershiptype)) :
              (misc[0] ? parseInt(misc[0].value.degree) : 0)
            )
          )
        }
        return {
          label: item,
          value: scores[item]()
        }

      }),
      perfomance: () => Object.keys(baseValues.perfomance).map(item => {
        const toCalculate = baseValues.perfomance[item]
        const scores = {
          yearsOfExperience: () => yearsOfExperience * toCalculate,
          skills: () => skills.length > 1 ? math.sum(...skills.map(item => parseInt(item.value['skill-level']))) + (skills.length * toCalculate) :
            (skills[0] ? parseInt(skills[0].value['skill-level']) : 0),

        }
        return {
          label: item,
          value: scores[item]()
        }
        return {
          label: item,
          value: scores[item]()
        }
      }),
    }
    this.setState({
      open: true
    })
    return calculate[type]()

  }

  setScoreValues(e) {
    e.preventDefault()
    const reputation = this.calculateScores('reputation')
    const identity = this.calculateScores('identity')
    const perfomance = this.calculateScores('perfomance')
    this.setState({
      scores: {
        reputation,
        identity,
        perfomance
      }
    })
  }
  render() {
    const {
      scores
    } = this.state
    return (
      <div className="container">
        <form onSubmit={this.setScoreValues}>
            <div className="row">
              <br />
            </div>
            <div className="row">
              <div className="col-10">
                <h3>TQ Demo</h3>
                <h4 className="text-muted">Check your TQ rating!</h4>
              </div>
              <div className="col-1 offset-1"><img height="70px" src={logo} alt="logo" /></div>
            </div>
            <div className="row">
              <div className="col-12">
                <br />
                <h2>Tell us a little about you.</h2>
                <br />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12">
                <h3>Your work experience <i className="fas fa-plus text-success" /></h3>
                <br />
                <DynamicField
                required
                fields={[
                  {type: "text", label: "Position", name: "position", placeholder: "Position name"},
                  {type: "date", label: "From", name: "from", placeholder: "From"},
                  {type: "date", label: "To", name: "to", placeholder: "To"},
                  {type: "text", label: "Workplace", name: "workplace", placeholder: "Workplace name"},
                ]}
                onChange={this.onChange('workexperence')}
                />
                <br />
                <div className="alert alert-info">
                  <p><i className="fas fa-exclamation-circle" /> When estimating your work experience rating imagine what score out of 10 would your boss give you.</p>
                </div>
                <hr />
                <h3>Your education <i className="fas fa-plus text-success" /></h3>
                <br />
                <DynamicField
                  onChange={this.onChange('education')}
                  fields={[
                  {type: "text", label: "University", name: "university", placeholder: "University name"},
                  {
                    type: "select",
                    label: "Select a Degree",
                    defaultValue: "0",
                    name: "degree",
                    placeholder: "Degree",
                    options: [
                      {label: "College", value: "1"},
                      {label: "Enginering", value: "5"}
                    ]
                  },
                  ]} />
                <hr />
                <h3>Reputation <i className="fas fa-plus text-success" /></h3>
                <DynamicField required
                  onChange={this.onChange('reputation')}
                  fields={[
                    {type: "number", label: "Points", name: "points", placeholder: "Points"},
                    {
                      type: "select",
                      label: "Source",
                      name: "source",
                      placeholder: "Source",
                      options: [
                        {label: "Academic Paper", value: "academic"},
                        {label: "Github", value: "github"},
                        {label: "StackOverflow", value: "stackoverflow"}
                      ]
                    },
                ]} />
                <div className="alert alert-info">
                  <p><i className="fas fa-exclamation-circle" /> Please enter your score for the relevant reputation examples (if applicable).</p>
                  <ul>
                    <li>Stack Overflow: Enter your total score</li>
                    <li>Github: Enter the total number of stars your repos have</li>
                    <li>Academic papers: Enter the number of references your paper has.</li>
                  </ul>
                </div>
                <hr />
                <h3>Misc <i className="fas fa-plus text-success" /></h3>
                <DynamicField
                  onChange={this.onChange('misc')}
                  fields={[
                    {type: "text", label: "Institution Name", name: "membership", placeholder: "Membership"},
                    {
                      type: "select",
                      label: "Membership Type",
                      name: "membershiptype",
                      placeholder: "Select Information Type",
                      options: [
                        {label: "Professional Membership", value: "5"},
                        {label: "Identity Proof", value: "2"}
                      ]
                    },
                  ]} />
                <hr />
                <h3> Skills <i className="fas fa-plus text-success" /></h3>
                <DynamicField
                onChange={this.onChange('skills')}
                fields={[
                  {type: "text", label: "Skill", name: "skill", placeholder: "Skill"},
                  {
                    type: "select",
                    label: "Skill level",
                    name: "skill-level",
                    placeholder: "Skill Level",
                    options: [
                      {label: "1", value: "1"},
                      {label: "2", value: "2"},
                      {label: "3", value: "3"},
                      {label: "4", value: "4"},
                      {label: "5", value: "5"},
                      {label: "6", value: "6"},
                      {label: "7", value: "7"},
                      {label: "8", value: "8"},
                      {label: "9", value: "9"},
                      {label: "10", value: "10"}
                    ]
                  },
                ]} />
                <hr />
                <h3> Social Networks <i className="fas fa-plus text-success" /></h3>
                <DynamicField
                  onChange={this.onChange('social')}
                  fields={[
                    {type: "text", label: "Institution Name", name: "url", placeholder: "url"},
                    {
                      type: "select",
                      label: "Network",
                      name: "network",
                      placeholder: "Network",
                      options: [
                        {label: "Facebook", value: "1"},
                        {label: "Twitter", value: "1"},
                        {label: "Dribble", value: "1"},
                        {label: "Behance", value: "1"},
                        {label: "Github", value: "1"}
                      ]
                    },
                  ]} />
              </div>
              <Button style={{margin: '15px'}} color="primary"> Send </Button>
            </div>
          </form>
         <Modal isOpen={this.state.open} toggle={this.toggle} wrapClassName="width-80">
          <ModalHeader toggle={this.toggle}>Your Score Is</ModalHeader>
          <ModalBody>
           {
             Object.keys(scores).map(item => (
               <div style={{width: '100%'}}>
                <GraphDetails title={item}  tqScores={scores[item]} stroke={strokes[item]}/>
               </div>
             ))
           }
           </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
