import React, {Component} from 'react';
import PropTypes from 'prop-types';


class SnippetsWall extends Component {
    render() {
        return (
            <div className="snippetsWrapperWrapper">
                {this.props.snippetsList.map((Snippet) => (
                    <div className="snippetWrapper">
                        {Snippet}
                    </div>
                ))}
            </div>
        )
    }
}


SnippetsWall.propTypes = {
    snippetsList: PropTypes.arrayOf(PropTypes.object)  // array of react components
};

export default SnippetsWall
