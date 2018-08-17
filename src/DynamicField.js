import React, {
  Component
} from 'react'

class DynamicField extends Component {
  constructor() {
    super()
    this.state = {
      fieldNumber: [{
        value: {}
      }]
    }
    this.addField = this.addField.bind(this)
  }

  addField() {
    this.setState({
      fieldNumber: this.state.fieldNumber.concat([{
        value: {}
      }])
    })
  }

  removeField(index) {
    this.setState({
      fieldNumber: this.state.fieldNumber.filter((item, key) => key !== index)
    })
  }

  onChangeValue(index, valueName) {
    return (event) => {
      let array = this.state.fieldNumber
      array[index].value[valueName] = event.target.value
      this.setState({fieldNumber: array})
      this.props.onChange && this.props.onChange(array)
    }
  }

  render() {
    const {
      fields,
      required
    } = this.props
    return this.state.fieldNumber.map((field, index) => (
      <div className="form-row align-items-center">
        {
            fields.map(item => (
              <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInput">{item.label}</label>
                {
                  item.type !== 'select' &&
                  <input
                    type={item.type}
                    name={item.name}
                    className="form-control mb-2"
                    required={required}
                    placeholder={item.placeholder}
                    onChange={this.onChangeValue(index, item.name)}
                    value={field.value[item.name]} />
                }
                {
                  item.type === 'select' &&
                    <select
                      required={required}
                      className="form-control mb-2"
                      value={field.value[item.name]}
                      onChange={this.onChangeValue(index, item.name)}>
                      <option value=''>{item.placeholder}</option>
                    {
                      item.options.map(option => (
                        <option value={option.value} >{option.label}</option>
                      ))
                    }
                    </select>
                }
              </div>
            ))
        }
        <div className="col-auto">
          {index === 0 && <button className="btn btn-success mb-2" onClick={this.addField} type='button' >+</button>}
          {index > 0 && <button className="btn btn-danger mb-2" onClick={this.removeField.bind(this, index)} type='button'>-</button>}
        </div>
      </div>
    ))
  }
}

export default DynamicField
