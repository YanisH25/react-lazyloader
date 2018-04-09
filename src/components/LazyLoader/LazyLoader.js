/* --------------- Vendors imports --------------- */

import React, {Component, Fragment} from 'react';

/* ----------------------------------------------- */

/*
    LazyLoader is a component that allows you to load another component just-in-time,
    it means that your component will be downloaded and loaded just when it mounts.

    To use this component, please use Create-React-App or configured Webpack to build your React project.

    This component accepts in props :
        - "placeholder" (ReactNode) : A Component that will be placed instead of your Lazy-Loaded Component during the loading.
        - "error" (ReactNode) : A Component that will be placed if the Lazy-Loaded Component can't be loaded.
        - "children" (Promise) : Your Lazy-Loaded Component in the form of a Promise obtained with "import('The relative path of your component')".

    Example :
        import LazyLoader from '@yanish/react-lazyloader';
        import MyPlaceholder from './somewhere';
        import MyErrorHandler from './somewhere';

        const MyLazyLoadedComponent = import('./somewhere in your project');

        const App = (props) => (
            <LazyLoader
                placeholder={<MyPlaceholder></MyPlaceholder>}
                error={<MyErrorHandler></MyErrorHandler>}>
                    {MyLazyLoadedComponent}
                </LazyLoader>
        );
*/

export class LazyLoad extends Component {

    state = {
        // The Lazy-Loaded Component
        component: null,
        // If the loading fail, it will be true and the error props will be showed
        error: false
    }

    // Load the Lazy-Loaded Component
    async componentDidMount() {
        const loadedComponent = await this.props.children.catch(() => {
            this.setState({
                // Set the error to true if the Component can't be reached
                error: true
            })
        });
        this.setState({
            // Set the Lazy-Loaded Component into the state, and it will be showed instead
            // of the placeholder
            component: loadedComponent.default || null
        })
    }
    render() {
        return (
            <Fragment>
                {/* Show conditionally the Lazy-Loaded Component if loaded or the placeholder */}
                {this.state.component && !this.state.error
                    ? <this.state.component {...this.props}/>
                    : this.props.placeholder}
                {/* Show the error component provided there is an error */}
                {this.state.error
                    ? this.props.error
                    : null}
            </Fragment>
        );
    }
}