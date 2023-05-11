import React, { Component } from 'react';
import {Button} from "antd";

class IndexForm extends Component {
    state={
        inputValue: 0
    }

    render() {
        return <form onSubmit={()=> {console.log("Submitted index")}}>
             <input type={"number"}/>
             <Button type={"submit"} className="btn read-more"
                    style={{backgroundColor: "green", color: "white"}}

            >
                Transmite index
            </Button>
          </form>;
    }
}

export default IndexForm;