import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import "./buyPage.css"
import { toast, ToastContainer } from 'react-toastify'
import useModifyData from '../customHooks/useModifyData';
import UserContext from '../contexts/userContext';
import { useNavigate, useParams } from 'react-router-dom';

const MyModal = ({category, setViewModelHelpher, viewModel, extra }) => {
    const { user, token } = useContext(UserContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const url = 'http://localhost:5000/api/orders'
    const { modifyData } = useModifyData({ url, method: "POST", token })

    let addrs = user.addresses.map((one)=> one.address)

    const paymentMethods = [
        "Credit Card",
        "PayPal",
        "Google Pay",
        "Cash On Delivery (Free Delivery)"
    ]

    const [err, setErr] = useState("")
    const [formData, setFormData] = useState({
        address: '',
        paymentMethod: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if( !['Watches' , 'Sarees'].includes(category)){
            if ((extra.color.length || extra.size.length) === 0) {
                setErr("Invalid color/size selected")
                return
            }
        }
        if (formData.address.length === 0 || formData.paymentMethod.length === 0) {
            setErr("Invalid selected address/payment method")
            return
        }

        const orderData = { ...extra, ...formData, key: id }

        const { error } = await modifyData(orderData)

        if (error) {
            toast.error("Order Failed! Try again...")
            setErr("")
            return
        }
        toast.success("Ordered Succesfully!")
        setTimeout(()=>{
            navigate('/my/orders')
        },1500)
        setErr("")
    }

    const goToAddress = () => {
        navigate('/my/')
    }

    return (
        <div>
            <ToastContainer />
            <Modal show={viewModel} onHide={setViewModelHelpher} centered backdrop="static" keyboard={false}>
                <div className='afterBuy'>
                    <fieldset className='modelForm'>
                        <legend>Select an address:</legend>
                        {(addrs && addrs.length !== 0) ? (addrs.map((address, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={`address${index}`}
                                    name="address"
                                    value={address}
                                    checked={formData.address === address}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor={`address${index}`}>{address}</label>
                            </div>

                        ))) : (
                            <h5 onClick={goToAddress}>Add Address Now...</h5>
                        )}

                        <legend>Select a payment method:</legend>
                        {paymentMethods.map((method, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={`paymentMethod${index}`}
                                    name="paymentMethod"
                                    value={method}
                                    checked={formData.paymentMethod === method}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor={`paymentMethod${index}`}>{method}</label>
                            </div>
                        ))}
                        <div className='error'>
                            {err}
                        </div>
                        <div className='buyPageBtn text-center mt-3'>
                            <button
                                className="closeNowBtn"
                                onClick={setViewModelHelpher}
                            >
                                Close Now
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="buyNowBtn"
                            >
                                Buy Now
                            </button>
                        </div>
                    </fieldset>
                </div>
            </Modal>
        </div>
    );
};

export default MyModal;
