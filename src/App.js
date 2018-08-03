import React, {
  Component
} from 'react';
import logo from './images/q_icon.png'
import DynamicField from './DynamicField'
import './css/app.css';
import './css/bootstrap.min.css';
import './css/fa-svg-with-js.css';

class App extends Component {
  render() {
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
            ]} />
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
                  {label: "College", value: "college"},
                  {label: "Enginering", value: "engineer"}
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
            <h3> Social Networks <i className="fas fa-plus text-success" /></h3>
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
