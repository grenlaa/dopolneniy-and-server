import React, { useState } from "react";

import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import ClassicEditor  from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

//import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';


export default function CkeditorCard(props) {
    const [data, setData] = useState(null)

    const custom_config = {
        extraPlugins: [MyCustomUploadAdapterPlugin],
        mediaEmbed: { previewsInData: true },
    }

    return (
        <div >
            <CKEditor
                editor={Editor}
                config={custom_config}
                data=""
                onReady={editor => {
                    editor.setData(props.descr)
                    console.log('========', props.descr);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setData(data);
                    { props.create(data) }
                }}
                onBlur={(event, editor) => {
                }}
                onFocus={(event, editor) => {
                    // editor.setData(props.descr)
                }}
            />
            {/* <div className="Container" dangerouslySetInnerHTML={{ __html: data }}></div> */}
        </div>
    );
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader)
    }
}


class MyUploadAdapter {
    constructor(props) {
        // CKEditor 5's FileLoader instance.
        this.loader = props;

    }

    // Starts the upload process.
    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        });
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open('POST', "http://localhost:8081/api/CreateImage", true);
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
        const data = new FormData();

        this.loader.file.then(result => {
            data.append('file', result);
            this.xhr.send(data);
        }
        )
    }

}