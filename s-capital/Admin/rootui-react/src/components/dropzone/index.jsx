/**
 * Styles
 */
import './style.scss';

/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/dedupe';
import Dropzone from 'react-dropzone';

/**
 * Internal Dependencies
 */
import Icon from '../icon';
import { fileSizeToHumanReadable } from '../../utils';

/**
 * Component
 */
class ComponentDropzone extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            files: [],
        };

        this.onChange = this.onChange.bind( this );
        this.removeFile = this.removeFile.bind( this );
    }

    onChange() {
        const {
            onChange = () => {},
        } = this.props;

        onChange( this.state.files );
    }

    removeFile( file ) {
        const newFiles = [ ...this.state.files ];

        newFiles.splice( newFiles.indexOf( file ), 1 );

        this.setState( {
            files: newFiles,
        }, this.onChange );
    }

    render() {
        const {
            settings,
        } = this.props;
        var max_files = 2
        return (
            <Dropzone
                // uploadMultiple={false}
                // parallelUploads={1}
                multiple={true}
                
                onDrop={ ( newFiles ) => {
                    console.log("==================",this.state.files);
                    console.log("newFiles==================",newFiles);
                    this.setState( {
                        files: [
                            // ...this.state.files,
                            ...newFiles,
                        ],
                    }, this.onChange );
                } }
            >
                { ( data ) => {
                    const rootProps = data.getRootProps();
                    const inputProps = data.getInputProps();

                    return (
                        <div
                            className={
                                classnames(
                                    'rui-dropzone',
                                    data.isDragActive ? 'rui-dropzone-is-active' : ''
                                )
                            }
                            { ...rootProps }
                        >
                            <input { ...inputProps } />
                            <div >
                                <div className="rui-dropzone-message">
                                    <span className="rui-dropzone-icon">
                                        <Icon name="upload-cloud" />
                                    </span>
                                </div>
                                </div>

                        </div>
                    );
                } }
            </Dropzone>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( ComponentDropzone );
