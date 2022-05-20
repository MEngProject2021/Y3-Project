import React from 'react';
import $ from 'jquery';
import { _ } from './classes/gettext';

class HyperspectralView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.task)

        const responese = $.getJSON(`/api/projects/${this.props.task.project}/tasks/${this.props.task.id}/hyperspectral_retrive/`, json =>{
            console.log(json)
        })

    }


    render() {

        return (

            <>
                {/* <img src={require(`${this.props.task.media_path}/Yu.hdr`)}></img> */}
                1312312312
            </>

        );
    }
}

$(function () {
    $("[hyperspectral-page]").each(function () {
        let props = $(this).data()
        console.log(props)
        window.ReactDOM.render(<HyperspectralView  {...props}/>, $(this).get(0));
    });
});

export default HyperspectralView;
