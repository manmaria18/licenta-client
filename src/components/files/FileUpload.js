import React, { Component } from 'react';
import { Upload, message } from 'antd';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";


export const FileTypes = {
    Image: {
        JPEG: 'image/jpeg',
        JPG: 'image/jpg',
        PNG: 'image/png',
    },

    Audio : {

    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function isFileValid(file, acceptedFileTypes, maxFileSize) {

    const isJpgOrPng = acceptedFileTypes.includes(file.type)

    if (!isJpgOrPng) {
        message.error(`You can only upload ${acceptedFileTypes} !`);
    }
    const isFittingSize = maxFileSize ? file.size / 1024 / 1024 < maxFileSize
        : true;
    if (!isFittingSize) {
        message.error(`Image must smaller than ${maxFileSize}`);
    }
    return isJpgOrPng && isFittingSize;
}


/**
 * props:
 * @fileTypes : string[]
 */
export class FileUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: this.props.fileList || [],
        };

    }


    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => {
        console.log("CHANGE", fileList);
        fileList = fileList.filter(file => isFileValid(file, this.props.acceptedFileTypes, this.props.maxFileSize))
        this.setState({ fileList});
        this.props.onChange && this.props.onChange(fileList);
    }


    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;

        const uploadButton = (
            <div>
                {/*<PlusOutlined />*/}<div>+</div>
                <div style={{ marginTop: 8 }}>{this.props.text || "Upload"}</div>
            </div>
        );

        console.log(":) :) :) ", this.props);

        return (
            <Upload
                listType="picture-card"
                fileList={this.props.fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                onRemove={this.props.onRemoveImage}
            >
                {this.props.fileList && this.props.fileList.length >= 1 ? null : uploadButton}
            </Upload>
        );
    }
}



