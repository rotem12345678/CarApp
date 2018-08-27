import React, {Component}  from 'react'
//Semantic-Ui:
import {Button, Container, Form} from 'semantic-ui-react'

import { CarTypDefault, CarTypes} from './CarTypes'

//option for Form Select
const options = Object.keys(CarTypes).map((name)=>({key: name, text: name, value: name}));

class AddCarForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const name = this.props.name;
        const cartype = this.props.cartype;

        //console.log(name);
        //console.log(cartype);

        return (
            <Container >
                {/*Form for Add New car*/}
                <Form
                    onSubmit={ (e) => {this.props.onSubmit(e)}}>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid label='Name: '
                            placeholder='Name'
                            type="text"
                            required={true}
                            value={name}
                            onChange={(e) => {this.props.onNameChange(e.target.value)
                            }}
                        />

                        <Form.Select
                            fluid label='Car Type:'
                            placeholder={CarTypDefault}
                            value={cartype}
                            options={options}
                            onChange={(e) => {this.props.onTypeChange(e.target.innerText)}}>
                        </Form.Select>
                    </Form.Group>

                    <Form.Button type="submit" value="Add New Car">
                        Add New Car
                    </Form.Button>
                </Form>
            </Container>
        );
    }
}

export default AddCarForm;



