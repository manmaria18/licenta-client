import React from 'react';
import { Button } from 'antd';
import IndexForm from '../../components/IndexForm';
import { EXPECTING_INPUT, PENDING } from '../../constants';

import { withRouter } from 'react-router-dom';

const BillsList = ({ bills, handleBillUpdate, history }) => {

    function onPay(id) {
        history.push(`/pay/${id}`);
    }

    return (
        <div>
            {bills &&
                bills.map((current, currentIndex) => (
                    <div
                        className="col-1-2"
                        key={current.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexFlow: 'column',
                            border: 5,
                            borderColor: '#000000',
                        }}
                    >
                        <br />
                        <article className="post-wrap">
                            <div className="post">
                                <h4 className="entry-title">Emitent: {current.providerService.provider.name}</h4>
                                <h4 className="entry-title">Status: {current.status.status}</h4>
                                <h4 className="entry-title">Tip factura: {current.providerService.serviceType.type}</h4>
                                <h4 className="entry-title">Data emiterii: {current.issueDate}</h4>
                                <h4 className="entry-title">Deadline: {current.deadline}</h4>
                                <h4 className="entry-title">Suma: {current.sum}</h4>
                                {current.status.status === EXPECTING_INPUT && (
                                    <IndexForm
                                        billId={current.id}
                                        handleSuccess={(newBill) => handleBillUpdate(currentIndex, newBill)}
                                    />
                                )}
                                {current.status.status === PENDING && (
                                    <Button
                                        className="btn read-more"
                                        onClick={() => onPay(current.id)}
                                        style={{ backgroundColor: 'green', color: 'white' }}
                                    >
                                        Plateste factura
                                    </Button>
                                )}
                            </div>
                        </article>
                        <br />
                        <br />
                    </div>
                ))}
        </div>
    );
};

export default withRouter(BillsList);
