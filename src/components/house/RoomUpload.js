import {Form, Icon} from "antd";
import {FileTypes, FileUpload} from "../files/FileUpload";
import React, { Component } from 'react';

const FormItem = Form.Item;

export class RoomUpload extends Component {

    _onChangeImage = (imageFileList) => {
        this.props.onChangeImage(imageFileList, this.props.roomNumber);
    }

    _onRemoveImage = () => {
        this.props.onRemoveImage(this.props.roomNumber);
    }


    render() {

        return (
            <FormItem validateStatus={this.props.room.validateStatus}
                      help={this.props.room.errorMsg} className="poll-form-row">
                <h3> Camera {this.props.roomNumber + 1} </h3>

                {
                    this.props.roomNumber > 0 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="close"
                            disabled={this.props.roomNumber === 0}
                            onClick={() => {
                                console.log("remove room number ", this.props.roomNumber)
                                this.props.removeRoom(this.props.roomNumber)
                            }}
                        />) : null
                }

                <FileUpload
                    text={"Upload Image"}
                    acceptedFileTypes={Object.values(FileTypes.Image)}
                    onChange={this._onChangeImage}
                    fileList={this.props.room.imageFiles}
                    onRemoveImage={this._onRemoveImage}
                />
            </FormItem>
        );
    }
}