import React, {Component}  from 'react'
import {Link} from 'react-router-dom';

//Semantic-Ui
import {Button, Container, Header, Input, Select, Segment, Form} from 'semantic-ui-react'

//option for Form Select
const options = [
    {key: 'SUV', text: 'SUV', value: 'SUV'},
    {key: 'Truck', text: 'Truck', value: 'Truck'},
    {key: 'Hybrid', text: 'Hybrid', value: 'Hybrid'}
]



//Page url: http://localhost:8080/CarPage/:id/edit

class CarEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: null,
            name: 'eee',
            cartype: 'SUV',
            //for check if update is needed:
            oldName: '',
            oldCarType: '',
        }

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        const id = this.props.match.params.id;

        fetch(`/api/vehicles/${id}`, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                const car = json[0];
                if (car !== undefined) {
                    this.setState({
                        vehicle: json[0],
                        name: json[0].name,
                        cartype: json[0].Car_type,
                        oldName: json[0].name,
                        oldCarType: json[0].Car_type,
                    });
                }
            });
    }

    handleChangeName(event) {
        const name = event.target.value;
        this.setState({
            name: name,
        });
    }

    handleChangeType(event) {
        const cartype = event.target.innerText;
        this.setState({
            cartype: cartype,

        });
    }

    //when click on 'Update' this function is called and send the new values to the server
    handleSubmit(event) {
        const id = this.props.match.params.id;
        const name = this.state.name;
        const carType = this.state.cartype;
        const oldName = this.state.oldName;
        const oldCarType = this.state.oldCarType;

        if (name === '' || name === null || name === undefined) {
            alert('please insert Car Name')
        }
        else if (name === oldName && carType === oldCarType) {
            alert('No need to Update, No changes have done')
        }
        else {
            fetch(`/api/vehicles/${id}/edit`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    Car_type: this.state.cartype,
                }),
            })
            this.setState({
                oldName: name,
                oldCarType: carType,
            });
            alert('Update Success')
        }
    }

    render() {

        const name = this.state.name;
        const cartype = this.state.cartype;
        const id = this.props.match.params.id;

        return (
            <div>
                <p></p>
                <Container fluid>
                    <Segment>
                        <Segment textAlign='center'>
                            <Header size='huge'>{name}</Header>
                        </Segment>
                        <Segment>

                            {/*Update form */}
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid label='Name: '
                                        placeholder='Name'
                                        type="text"
                                        required={true}
                                        value={name}
                                        onChange={this.handleChangeName}
                                    />
                                    <Form.Select
                                        fluid label='Car Type:'
                                        placeholder='SUV'
                                        value={cartype}
                                        options={options}
                                        onChange={this.handleChangeType}
                                    />
                                </Form.Group>
                                <Form.Button color="blue" type="submit" value="Submit">Update </Form.Button>
                            </Form>
                        </Segment>
                        <Segment>
                            {/*Button to navigate*/}
                            <Link to={`/CarPage/${id}`}>
                                <Button basic color='red'>Back To Car Page</Button>
                            </Link>

                            <Link to='/'>
                                <Button basic color='red'>Back Home</Button>
                            </Link>
                        </Segment>
                    </Segment>
                </Container>
            </div>

        );
    }
}

export default CarEditPage;




