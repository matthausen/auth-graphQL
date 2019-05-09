import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';


class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        }
    }

    componentWillUpdate(nextProps) {
        // nextProps is the next set of props when the component rerenders
        if (!this.props.data.user && nextProps.data.user) {
            //User was not singed in but now is
            //redirect to dashboard
            hashHistory.push('/dashboard');
        }
    }


    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password }
        }).catcch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        });
    }


    render() {
        return (
            <div>
                <h3>SignUp</h3>
                <AuthForm
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(SignupForm)
);