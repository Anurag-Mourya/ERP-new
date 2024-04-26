import React, { useEffect, useState } from 'react'
import Topbar from '../../../Components/NavigationBars/Topbar'
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar'
import { BsArrowRight } from 'react-icons/bs';
import { creatCustomFields } from '../../../Redux/Actions/globalActions';
import { useDispatch, useSelector } from 'react-redux';

const NewField = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state?.createCustom);

  const [switchValue, setSwitchValue] = useState("50");
  const [switchValue1, setSwitchValue1] = useState("1");

  const [inputValues, setInputValues] = useState(['']);

  const addInputField = () => {
    setInputValues([...inputValues, '']);
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const removeInputField = (index) => {
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);
    setInputValues(newInputValues);
  };

  const [formData, setFormData] = useState({
    label: "",
    module_id: "1",//create item.
    field_name: "",
    field_type: "",
    required_status: "1",
    dropdown_value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(creatCustomFields(formData))
  };

  useEffect(() => {
    if (status?.message === "Custom field inserted in module1") {
      toast.success(status?.message);
    }
  }, [status?.message]);

  const handleSwitchChange = (e) => {
    setSwitchValue(e.target.value);
  };

  // Function to handle radio button changes for Is mandatory
  const handleSwitchChange1 = (e) => {
    setSwitchValue1(e.target.value);
    setFormData({
      ...formData,
      required_status: e.target.value
    })
  };

  useEffect(() => {
    const stringifiedValues = JSON.stringify(inputValues);
    if (formData?.field_type === "Dropdown") {
      setFormData({
        ...formData,
        dropdown_value: stringifiedValues
      })
    }
  }, [inputValues]);


  return (
    <>
      <TopLoadbar />
      <Topbar />
      <div id="formofcreateitems">
        <form onSubmit={handleSubmit}>
          <div className="itemsformwrap">
            <div id="forminside">
              <div className="form-groupx1">
                <div className="form-group">
                  <label>Label Name</label>
                  <span>
                    <input type="text" name="label" placeholder='Enter label name' value={formData.label} onChange={handleChange} />
                  </span>
                </div>
                <div className="form-group">
                  <label>Data Type</label>
                  <span>
                    <select name="field_type" value={formData?.field_type} onChange={handleChange} >
                      <option value="">Select</option>
                      <option value="Text Area">Text Area</option>
                      <option value="Text">Text</option>
                      <option value="Dropdown">Dropdown</option>
                    </select>
                  </span>
                </div>
                <div className="form-group">
                  <label>Preview</label>
                  <span>
                    <div className="form-group">
                      {formData?.field_type === "Text" &&
                        <>
                          <label>{formData?.label}</label>
                          <input type="text" name="dropdown_value" placeholder='Enter text' value={formData.dropdown_value} onChange={handleChange} />
                          <span>
                          </span>
                        </>
                      }

                      {formData?.field_type === "Text Area" &&
                        <>
                          <label>{formData?.label}</label>
                          <textarea name="dropdown_value" maxLength={(+switchValue)} id="" cols="30" rows="10" onChange={handleChange} value={formData.dropdown_value}></textarea>
                          <span>
                          </span>
                        </>
                      }

                      {formData?.field_type === "Dropdown" &&
                        <>
                          <div className="form-group">
                            <label>{formData?.label}</label>
                            <div>
                              {inputValues.map((value, index) => (
                                <div key={index}>

                                  <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                  />
                                </div>
                              ))}
                            </div>

                            <span>
                            </span>
                          </div>
                        </>
                      }
                    </div>
                  </span>
                </div>
              </div>
              <div className="form-groupx1">
                <div className="form-group">
                  <label>Placeholder</label>
                  <span>
                    <input type="text" name="field_name" placeholder='Enter Placeholder related to label' value={formData.field_name} onChange={handleChange} />
                  </span>
                  {formData?.field_type === "Text Area" &&
                    <span>
                      Up to 50
                      <input type="radio" name="switchPlan" checked={switchValue === "50"} value="50" onChange={handleSwitchChange} />
                      Max length
                      <input type="radio" checked={switchValue === "10000"} name="switchPlan" className='newinput' value="10000" onChange={handleSwitchChange} />
                    </span>
                  }
                </div>
                <div className="form-group">
                  <label>Is mandatory</label>
                  <span>
                    Yes
                    <input type="radio" name="switchPlan1" checked={switchValue1 === "1"} value="1" onChange={handleSwitchChange1} />
                    No
                    <input type="radio" name="switchPlan1" checked={switchValue1 === "0"} className='newinput' value="0" onChange={handleSwitchChange1} />
                  </span>
                </div>

              </div>
              <div className="form-groupx1">
                <div className="form-group">
                  {formData?.field_type === "Text" &&
                    <>
                      <label>Enter Text</label>
                      <input type="text" name="dropdown_value" placeholder='Enter text' value={formData.dropdown_value} onChange={handleChange} />
                      <span>
                      </span>
                    </>
                  }

                  {formData?.field_type === "Text Area" &&
                    <>
                      <label>Enter Text</label>
                      <textarea name="dropdown_value" maxLength={(+switchValue)} id="" cols="30" rows="10" onChange={handleChange} value={formData.dropdown_value}></textarea>

                      <span>
                      </span>
                    </>
                  }

                  {formData?.field_type === "Dropdown" &&
                    <>
                      <div className="form-group">
                        <label>Drop Down options</label>
                        <label>options count {inputValues.length}</label>
                        <div>
                          {inputValues.map((value, index) => (
                            <div key={index}>
                              <span>
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                              </span>
                              <button onClick={() => removeInputField(index)}>Close</button>
                            </div>
                          ))}
                          <button onClick={addInputField}>New Create</button>
                        </div>

                        <span>
                        </span>
                      </div>
                    </>
                  }
                </div>

              </div>
            </div>
          </div>
          <div className="actionbar">
            <button id='herobtnskls' type="submit" >
              <p>Save<BsArrowRight /></p>
            </button>
            <button type='button'>Cancel</button>
          </div>
        </form >
      </div >
    </>
  )
}

export default NewField
