import React, {Component}  from 'react';
import {Link} from 'react-router-dom'
import {Button, Container, Header, Card, Grid, Segment, List} from 'semantic-ui-react'
import NotFound from './NotFound';


class CarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: null,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        fetch(`/api/vehicles/${id}`, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                const car = json[0];
                if (car !== undefined) {
                    this.setState({
                        vehicle: json[0]
                    });
                }
            });
    }

    render() {
        const car = this.state.vehicle;

        //Car details initialize:
        let carName = "no car";
        let carType = "no car";
        let Created_date = "no car";
        let Last_Successful_Connection = "no car";
        let Vehicle_ID = "no car";

        if (car !== null) {
            carName = car.name;
            carType = car.Car_type;
            Created_date = (new Date(car.Created_date)).toLocaleString();
            Last_Successful_Connection = (new Date(car.Last_Successful_Connection)).toLocaleString();
            Vehicle_ID = car.Vehicle_ID;

        }

        const id = this.props.match.params.id;

        //if Car is null return: Not found
        if (!car) {
            return (
            <div>
                <NotFound/>
            </div>
            )
        }

        //Else:
        return (
            <div>
                <Container >
                    <Segment>
                        <Grid relaxed container stackable divided='vertically' verticalAlign='middle' textAlign='left'>
                            <Grid.Row>
                                {/*Page Heade*/}
                                <Header size='huge'>
                                    Vehicle: {carName}
                                </Header>
                            </Grid.Row>


                            <Grid.Row >
                                {/*Car Description*/}
                                <List size='huge'>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>
                                                Name:
                                            </List.Header>
                                            <List.Description>
                                                {carName}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>
                                                Car Type:
                                            </List.Header>
                                            <List.Description>
                                                {carType}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>
                                                Created date:
                                            </List.Header>
                                            <List.Description>
                                                {Created_date}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>
                                                Last Successful Connection:
                                            </List.Header>
                                            <List.Description>
                                                {Last_Successful_Connection}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>
                                                Vehicle_ID:
                                            </List.Header>
                                            <List.Description>
                                                {Vehicle_ID}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>


                                </List>
                            </Grid.Row>
                            {/*link to Edit Car*/}
                            <Grid.Row>
                                <Link to={`/CarPage/${id}/edit`}>
                                    <Button color='blue'>
                                        Edit
                                    </Button>
                                </Link>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    {/*Link Back to Home Page*/}
                    <Link to={'/'}>
                        <Button>
                            Back Home
                        </Button>
                    </Link>
                </Container>
            </div>
        )
    };
}
;

export default CarPage
