import React from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextInput from '../common/TextInput/TextInput';
import { UsersContext } from '../context/UserContext'; 
import validate from '../helpers/validate';
 
class UserAdd extends React.Component {

    static contextType = UsersContext;

    state = {
        formData: {
            firstname: {
                value: '',
                label: 'First Name',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: true,
                    minLength: 3
                },
                config: {
                    name: "firstname",
                    type: "text"
                }
            },

            lastname: {
                value: '',
                label: 'Last Name',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: true,
                    minLength: 3
                },
                config: {
                    name: "lastname",
                    type: "text"
                }
            },

            address: {
                value: '',
                label: 'Your Address',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: true
                },
                config: {
                    name: "address",
                    type: "text"
                }
            },

            email: {
                value: '',
                label: 'Your Email',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: true,
                    isEmail: true
                },
                config: {
                    name: "email",
                    type: "text"
                }
            },

            age: {
                value: '',
                label: 'Age',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: true,
                    ageLimit: 18
                },
                config: {
                    name: "age",
                    type: "text"
                }
            },

            position: {
                value: '',
                label: 'Position',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: false,
                },
                config: {
                    name: "position",
                    type: "text"
                }
            }
        }
    }

    updateState = newFormData => this.setState({ formData: newFormData })

    onInputChange = e => {
        const { value, name } = e.target;

        const updatedFormData = {...this.state.formData}
        const updatedElement = {...updatedFormData[name]}

        updatedElement.value = value;
        const { isValid, error } = validate(updatedElement.value, updatedElement.validationRules);
        updatedElement.isValid = isValid;
        updatedElement.error = error;

        updatedFormData[name] = updatedElement;
        
        this.updateState(updatedFormData);
    }

    onSubmit = (e, addUser) => {
        e.preventDefault();
        const updatedFormData = {...this.state.formData};
        let values = {};
        let errors = [];

        for (let value in updatedFormData) {
            const updatedElement = updatedFormData[value];
            const { isValid, error } = validate(updatedElement.value, updatedElement.validationRules);
            updatedElement.touched = true;
            updatedElement.isValid = isValid;
            updatedElement.error = error;
            if(error) {
                errors.push(error);
            } else {
                values[value] = updatedElement.value;
            }
            updatedFormData[value] = updatedElement;
        }

        if(errors.length===0) {
            // set Date
            const date = new Date();
            const frmt = 'DD/MM/YYYY HH:mm:ss';
            const createDate = moment.utc(date, frmt).local().format(frmt);

            // generate new Id 
            const newId = this.context.users.length + 1;

            values.id = newId;
            values.createDate = createDate;
            addUser(values);
            
            for( let value in updatedFormData ) {
                const updatedElement = updatedFormData[value];
                updatedElement.touched = false;
                updatedElement.isValid = true;
                updatedElement.value = '';
            }
            this.props.history.push('');
        }

        this.updateState(updatedFormData);
    }

    render(){
        const { firstname, lastname, address, email, age, position } = this.state.formData;
        return (
            <form autoComplete="off">
                <div className="formfields">
                    <TextInput
                        {...firstname}
                        onChange={this.onInputChange}
                    />
                    <TextInput
                        {...lastname}
                        onChange={this.onInputChange}
                    />
                    <TextInput
                        {...address}
                        onChange={this.onInputChange}
                    />
                    <TextInput
                        {...email}
                        onChange={this.onInputChange}
                    />
                    <TextInput
                        {...age}
                        onChange={this.onInputChange}
                    />
                    <TextInput
                        {...position}
                        onChange={this.onInputChange}
                    />
                </div>
                <UsersContext>
                    {(value)=>(
                        <>
                            <Button variant="outlined" color="primary" onClick={(e)=>this.onSubmit(e, value.addUser)}>
                                ADD
                            </Button>
                        </>
                    )}
                </UsersContext>
            </form>
        )
    }
};

export default UserAdd;