import React, {
  Component
} from 'react';
import logo from './images/q_icon.png'
import DynamicField from './DynamicField'
import {
  Modal,
  Button
} from 'reactstrap'
import './css/app.css';
import './css/bootstrap.min.css';
import './css/fa-svg-with-js.css';
import * as math from 'mathjs'

class App extends Component {
  constructor() {
    super()
    this.state = {
      workexperence: [],
      education: [],
      skills: [],
      social: [],
      misc: [],
      reputation: [],
      scores: {
        reputation: 0,
        identity: 0,
        perfomance: 0,
        total: 0
      }
    }
    this.onChange = this.onChange.bind(this)
    this.calculateScores = this.calculateScores.bind(this)
    this.setScoreValues = this.setScoreValues.bind(this)
  }
  onChange(name) {
    return value => {
      this.setState({
        [name]: value
      })
    }
  }

  formula(baseValue, value) {
    return ( baseValue * parseInt( value ) ) / 2
  }

  calculateScores(type, data){

    const {
      workexperence,
      skills,
      social,
      misc,
      reputation,
      education
    } = data

    const baseValues = {
      workexperence: {
        perfomance: 15,
        identity: 10,
        reputation: 5
      },
      education: {
        perfomance: 25,
        identity: 0,
        reputation: 0
      },
      skills: {
        perfomance: 15,
        identity: 0,
        reputation: 10
      },
      social: {
        perfomance: 0,
        identity: 5,
        reputation: 0
      },
      misc: {
        perfomance: 0,
        identity: 15,
        reputation: 0
      },
      reputation: {
        perfomance: 25,
        identity: 0,
        reputation: 0
      },
    }
    return math.sum(
      ...skills.map(item => this.formula(baseValues.skills[type], item.value["skill-level"])),
      ...education.map(item => this.formula(baseValues.skills[type], item.value["degree"])),
      ...reputation.map(item => this.formula(baseValues.skills[type], item.value["points"])),
      ...social.eputation.map(item => this.formula(baseValues.skills[type], item.value["points"])),
      ...misc.eputation.map(item => this.formula(baseValues.skills[type], item.value["points"])),
      ...workexperence.eputation.map(item => this.formula(baseValues.skills[type], item.value["points"]))
    )
  }

  setScoreValues() {
    this.setState({
      scores: {
        reputation: this.calculateScores('reputation', this.state),
        perfomance: this.calculateScores('perfomance', this.state),
        identity: this.calculateScores('identity', this.state)
      }
    })
  }
  render() {
    const {
      scores
    } = this.state
    console.log(scores)
    return (
      <div className="container">
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
            <DynamicField fields={[
              {type: "text", label: "Workplace", name: "workplace", placeholder: "Workplace name"},
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
            <DynamicField fields={[
              {type: "text", label: "University", name: "university", placeholder: "University name"},
              {
                type: "select",
                label: "Degree",
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
            <DynamicField fields={[
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
            <DynamicField fields={[
              {type: "text", label: "Institution Name", name: "membership", placeholder: "Membership"},
              {
                type: "select",
                label: "Membership Type",
                name: "membershiptype",
                placeholder: "Select Information Type",
                options: [
                  {label: "Professional Membership", value: "Professional"},
                  {label: "Identity Proof", value: "identityproof"}
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
            <DynamicField fields={[
              {type: "text", label: "Institution Name", name: "url", placeholder: "url"},
              {
                type: "select",
                label: "Network",
                name: "network",
                placeholder: "Network",
                options: [
                  {label: "Professional Membership", value: "Professional"},
                  {label: "Identity Proof", value: "identityproof"}
                ]
              },
            ]} />
          </div>
          <div>
          <Button onClick={this.setScoreValues}> Send </Button>
          </div>
        </div>
        <Modal>
          {scores.total}
        </Modal>
      </div>
    );
  }
}

export default App;
