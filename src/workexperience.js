import React, {
  Component,
  Fragment
} from 'react'

class WorkExperience extends Component {
  constructor() {
    super()
    this.state = {
      experiences: [{
        value: ''
      }]
    }
    this.addWork = this.addWork.bind(this)
  }

  addWork() {
    this.setState({
      experiences: this.state.experiences.concat([{value: ''}])
    })
  }

  render() {
    return (
      <div className="form-row align-items-center">
        {
          this.state.experiences.map(item => (
          <Fragment>
              <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInput">Name</label>
                <input type="text" className="form-control mb-2" placeholder="Workplace name" defaultValue="TiiQu Ltd" />
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">From</div>
                  </div>
                  <input type="date" className="form-control" placeholder="Username" defaultValue="2016-01-01" />
                </div>
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">To</div>
                  </div>
                  <input type="date" className="form-control" placeholder="Username" defaultValue="2018-01-01" />
                </div>
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInput">Role</label>
                <input type="text" className="form-control mb-2" placeholder="Role" defaultValue="Developer" />
              </div>
              <div className="col-1">
                <label className="sr-only" htmlFor="inlineFormInput">Rating</label>
                <input type="text" className="form-control mb-2" placeholder="Rating" defaultValue={8} />
              </div>
              <div className="col-1">
                <button className="btn btn-danger mb-1" onClick={this.addWork}>-</button>
              </div>
            </Fragment>
          ))
        }
      </div>
    )
  }
}

export default WorkExperience
