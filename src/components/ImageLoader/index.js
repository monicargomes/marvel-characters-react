import React, { Component } from 'react';
import classNames from 'classnames';
import './style.css';

class ImageLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false,
        }
        this.onImageLoad = this.onImageLoad.bind(this);
    }
    onImageLoad() {
        this.setState({imageLoaded: true})
    }
    render() {
        const { src, alt } = this.props;
        const { imageLoaded } = this.state;
        
        return (
            <div className="image-loader">
                {!imageLoaded && <div className="image-loader__placeholder">Loading...</div>}
                <img alt={alt} className={classNames('image-loader__img', {hidden: !imageLoaded})} onLoad={this.onImageLoad} src={src}/>
            </div>
        );
    }
}
        
export default ImageLoader;