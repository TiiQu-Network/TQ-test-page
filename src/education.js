import React, {
  Component
} from 'react'

class Education extends Component {
  constructor() {
    super()
    this.state = {
      education: [{
        value: ''
      }]
    }
    this.addEducation = this.addEducation.bind(this)
  }

  addEducation() {
    this.setState({
      education: this.state.education.concat([{
        value: ''
      }])
    })
  }

  render() {
    return (
      <div className="form-row align-items-center">
        {
          this.state.education.map(item => (
          <div className="col-xs-12">
              <div className="form-row align-items-center">
                <div className="col-auto">
                  <label className="sr-only" htmlFor="inlineFormInput">Name</label>
                  <input type="text" className="form-control mb-2" id="inlineFormInput" placeholder="Institution Name" defaultValue="University of Newtown" />
                </div>
                <div className="col-auto">
                  <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                  <select type="text" className="form-control mb-2" id="inlineFormInputGroup">
                    <option>Select the institution type</option>
                    <option selected>University</option>
                    <option>College</option>
                    <option>Certification</option>
                  </select>
                </div>
                <div className="col-auto">
                  <button className="btn btn-danger mb-2" onClick={this.addEducation}>-</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Education
