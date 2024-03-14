import React, { useContext, useState } from 'react'
import './typeCategory.css'
import TypesCatesContext from '../contexts/TypesCatesContext'
import Type from './Type'
import useModifyData from '../customHooks/useModifyData'
import UserContext from '../contexts/userContext'
import { toast, ToastContainer } from 'react-toastify'


const CanModify = () => {
    const { typesCates ,setTypesCates } = useContext(TypesCatesContext)
    const { token } = useContext(UserContext)
    const url = `http://localhost:5000/api/type_category`

    const { modifyData } = useModifyData({url, token})
    const [view, setView] = useState(false)
    const [newOne, setNewOne] = useState('')

    const viewAddOne = () =>{
        setNewOne("")
        setView(prev => !prev)
    }
    const addNewType = async()=>{
        if(newOne.length === 0) return

        try {
            await modifyData({type: newOne})
            
            setTypesCates([])
            setNewOne("")
            toast.success("Successfully added new product type")
        } catch (error) {
            toast.error("Failed to add one!")
        }
    }

    return (
        <div className='canModify'>
            <div className='typeCategoryDiv'>
                <div className='typesHeading'>
                    Available Types & Categories
                </div>
                <div className='typeCategory'>
                    {(typesCates && typesCates.length !== 0) && (
                        typesCates.map(one => {
                            return (
                                <Type key={one._id} {...one} />
                            )
                        })
                    )
                    }
                </div>
                { view && (
                    <div className='addTypes'>
                        <input
                            className='addCatesInput'
                            type='text'
                            placeholder='Add new one'                            
                            value={newOne}
                            onChange={(e)=> setNewOne(e.target.value)}
                        />
                        <span
                            onClick={addNewType}
                            className='addSpan'
                        >✅
                        </span>
                        <span
                            onClick={viewAddOne}
                            className='addSpan'
                        >🚫
                        </span>
                    </div>
                )
                }
                { 
                    <div className='addTypes'
                        onClick={viewAddOne}
                    >
                    {`Add new product type  ➕`} 
                    </div>
                }
                <ToastContainer />
            </div>
        </div>
    )
}

export default CanModify
