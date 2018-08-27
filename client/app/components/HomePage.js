import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AddCarForm from './AddCarForm';
//Semantic-Ui:
import {Button, Container, Header, Card, Grid, Segment} from 'semantic-ui-react';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vehicles: [],
            name: 'h',
            cartype: 'SUV',
            //for Hide the AddCarForm
            isHidden: true,
        };

        this.removeCar = this.removeCar.bind(this);
        this._modifyCars = this._modifyCars.bind(this);

        //AddCarFormFunction:
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //AddCarFormFunction, onNameChange :
    handleChangeName(name) {
        this.setState({
            name: name,
        });
    }

    //AddCarFormFunction, onTypeChange :
    handleChangeType(cartype) {
        this.setState({
            cartype: cartype
        });
    }

    //AddCarFormFunction, onSubmit:
    handleSubmit(event) {
        fetch('/api/vehicles/add', {
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
            .then(res => res.json())
            .then(json => {
                let data = this.state.vehicles;
                data.push(json);
                //update the new vehicles list and hide again the AddCarForm
                this.setState({
                    vehicles: data,
                    isHidden: true
                });
            });
        event.preventDefault();
    }

    componentDidMount() {
        fetch('/api/vehicles')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    vehicles: json
                });
            });
    }

    //Function for Removing a Car
    removeCar(index) {
        const id = this.state.vehicles[index]._id;
        fetch(`/api/vehicles/${id}`, {method: 'DELETE'})
            .then(_ => {
                this._modifyCars(index, null);
            });
    }

    _modifyCars(index, data) {
        let prevData = this.state.vehicles;
        if (data) {
            prevData[index] = data;
        } else {
            prevData.splice(index, 1);
        }
        this.setState({
            vehicles: prevData
        });
    }

    render() {

        const vehicles = this.state.vehicles.slice();

        return (
            <div>
                <Container fluid>
                    <Segment>
                        <Segment textAlign='center'>
                            <Header size='huge'>Vehicles:</Header>
                        </Segment>
                        <Segment >
                            <Card.Group centered>
                                { vehicles.map((car, i, arr) => (
                                    <Card key={i}>
                                        <Card.Content textAlign='center'>
                                            <Card.Header textAlign='center'>
                                                {/*Routing to Car Page*/}
                                                <Link to={`/CarPage/${arr[i]._id}`} key={i}>
                                                    { car.name }
                                                </Link>
                                            </Card.Header>
                                            <Card.Meta>{car.Car_type}</Card.Meta>
                                        </Card.Content>
                                        <Card.Content extra textAlign='center'>
                                            {/*Routing to EDIT Car Page*/}
                                            <Link to={`/CarPage/${arr[i]._id}/edit`} key={i}>
                                                <Button basic color='green'>
                                                    Edit Car
                                                </Button>
                                            </Link>
                                            {/*REMOVE Car Button*/}
                                            <Button basic color='red'
                                                    onClick={() => this.removeCar(i)}>
                                                Remove
                                            </Button>
                                        </Card.Content>
                                    </Card>
                                )) }
                            </Card.Group>
                        </Segment>

                        {/*Add New Car Segment*/}
                        <Segment>
                            {this.state.isHidden && <Button onClick={() => {
                                this.setState({isHidden: false})
                            }}>
                                Add New Car
                            </Button>}
                            <div >
                                {!this.state.isHidden &&
                                <AddCarForm
                                    onSubmit={this.handleSubmit}
                                    onNameChange={ this.handleChangeName}
                                    onTypeChange={this.handleChangeType }
                                />}
                            </div>
                        </Segment>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default Home;
