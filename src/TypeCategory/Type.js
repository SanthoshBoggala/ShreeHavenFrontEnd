import React, { useState, useContext } from 'react'
import './typeCategory.css'
import Category from './Category'
import useModifyData from '../customHooks/useModifyData'
import UserContext from '../contexts/userContext'
import { toast, ToastContainer } from 'react-toastify'
import TypesCatesContext from '../contexts/TypesCatesContext'


const Type = ({ type, categories }) => {
    const { setTypesCates } = useContext(TypesCatesContext)
    const { token } = useContext(UserContext)
    const url = `http://localhost:5000/api/type_category`

    const { modifyData } = useModifyData({url, token})
    const { modifyData: deleteCategory } = useModifyData({url, method: 'PUT', token})
    const [view, setView] = useState(false)
    const [newOne, setNewOne] = useState('')

    const viewAddOne = () =>{
        setNewOne("")
        setView(prev => !prev)
    }
    const addNewCategory = async()=>{
        if(newOne.length === 0) return

        try {
            await modifyData({category: newOne, type})
            
            setTypesCates([])
            toast.success("Successfully added new category")
        } catch (error) {
            toast.error("Failed to add one!")
        }
    }
    const deleteType = async()=>{
        try {
            await deleteCategory({type})
            
            setTypesCates([])
            toast.success("Successfully added new category")
        } catch (error) {
            toast.error("Failed to add one!")
        }
    }
    return (
        <div className='typesDiv'>
            <div className='type'>{type}
                <span
                    className='productType'
                    onClick={deleteType}
                >
                    🚫
                </span>
            </div>
            <div className='categories row'>
                {
                    (categories && categories.length !== 0) && (
                        categories.map(cate=> <Category key={cate.category} type={type} category={cate.category}/>)
                    )
                }
                { view && (
                    <div className='category addCates text-center col-lg-2 col-md-3 col-sm-4 col-6'>
                        <input
                            className='addCatesInput'
                            type='text'
                            placeholder='Add new one'                            
                            value={newOne}
                            onChange={(e)=> setNewOne(e.target.value)}
                        />
                        <span
                            onClick={addNewCategory}
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
                    <div className='category text-center addBtn col-lg-2 col-md-3 col-sm-4 col-6'
                        onClick={viewAddOne}
                    >
                        ➕
                    </div>
                }
                <ToastContainer />
            </div>
        </div>
    )
}

export default Type
