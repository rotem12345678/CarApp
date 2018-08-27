import React from 'react';
import {Link} from 'react-router-dom';
//Semantic-Ui:
import {Button, Header} from 'semantic-ui-react'


const NotFound = () => (
    <div>
        <Header>Page not found</Header>

        <Link to={'/'}>
            <Button>
                Back Home
            </Button>
        </Link>
    </div>
);

export default NotFound;
