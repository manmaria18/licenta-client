import React, { Component } from 'react';
import { getHouse } from '../../util/APIUtils';
import BillsList from "../../components/bill/BillList";


class ViewBillsOfAHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoomIndex: -1,
            house: {
                name: {
                    text: ''
                },
                description: {
                    text: ''
                },
                price: 0,
                rooms: [],
                liked: false,
                location: {},
                bills: [],
            },
            bill: {
                sum: 0.0,
                houseId: 0,
                issuedBy: '',
                issueDate: '',
                deadline: '',
            }
        };
    }

    componentDidMount() {
        getHouse(this.props.match.params.id)
            .then((response) => {
                this.setState({
                    house: {
                        id: response.id,
                        name: {
                            text: response.name,
                        },
                        description: {
                            text: response.description,
                        },
                        location: response.location,
                        bills: response.bills
                    }
                });
            });
    }

    handleBillPayment = (billId) => {
        // Perform bill payment logic here
        console.log('Payment for bill with ID:', billId);
    };

    handleBillUpdate = (billIndex, newBill) => {
        const updatedBills = [...this.state.house.bills];
        updatedBills[billIndex] = newBill;
        this.setState({
            house: {
                ...this.state.house,
                bills: updatedBills,
            },
        });
    };




    render() {
        const { house } = this.state;

        return (
            <div>
                {
                    house.bills.length < 1
                    ? <div> Nu sunt facutri curente </div>
                    : <BillsList
                        bills={house.bills}
                        handleBillPayment={this.handleBillPayment}
                        handleBillUpdate={this.handleBillUpdate}
                    />
                }

            </div>
        );
    }
}

export default ViewBillsOfAHouse;