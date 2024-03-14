import React, { useContext, useEffect, useState } from 'react'
import './uploadProduct.css'
import UserContext from '../contexts/userContext';
import TypesCatesContext from '../contexts/TypesCatesContext';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';

const PersonalInfo = () => {

  const { id } = useParams()
  const { user: { type }, token } = useContext(UserContext)
  const { typesCates } = useContext(TypesCatesContext)


  const initialProduct = {
    name: '',
    brand: '',
    category: '',
    productType: '',
    price: '',
    discount: '',
    inStock: 'true',
    ratings: 0,
    images: '',
    description: '',
    starRating: 0,
  }

  const [product, setProduct] = useState(initialProduct)
  const [imgs, setImages] = useState([])
  const [err, setErr] = useState('')
  const [categoryList, setCategoryList] = useState([])


  useEffect(() => {
    if (!id) {
      return
    }
    async function getProduct() {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`)
      const item = res.data.product

      setProduct(() => ({
        name: item.name,
        brand: item.brand,
        category: item.category,
        productType: item.type,
        price: item.price,
        discount: item.discount,
        inStock: `${item.inStock}`,
        ratings: item.ratings,
        description: item.description,
        starRating: parseFloat(item.starRating),
      }))
      setCategoryList(() => {
        const cates = typesCates.find((one) => one.type === item.type)
        return cates.categories
      })
    }
    getProduct()
  }, [id, typesCates])


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setErr('')
    if (name === 'productType') {
      setCategoryList(() => {
        const cts = typesCates.find(one => one.type === value)
        return cts.categories
      })
    }
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  }

  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']
  const handleImages = (e) => {
    const { files } = e.target
    let check = true

    Array.from(files).forEach((one) => {
      if (!validFileTypes.includes(one.type)) {
        setErr("Only jpeg, jpg, png, and webp files allowed")
        setImages([])
        check = false
      }
    })

    if (check) {
      setImages(Array.from(files))
    }
  }

  const validateProduct = () => {
    if (type === 'customer' && imgs.length < 3) {
      setErr("min 3 images should be uploaded")
      return false
    }
    return true
  }

  const uploadProduct = async (e) => {
    e.preventDefault()

    if (!validateProduct()) return

    setErr('')


    let formData = new FormData()

    if (type === 'customer') {
      for (const key in product) {
        formData.append(key, product[key])
      }

      for (let i = 0; i < imgs.length; i++) {
        formData.append(`images[]`, imgs[i])
      }
    }


    try {
      let url
      let res
      if (!id) {
        url = `http://localhost:5000/api/products`

        res = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }
      else {
        url = `http://localhost:5000/api/products/${id}`

        res = await axios.put(url, product, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }


      if (res && res.data.msg) {
        setErr(res.data.msg)
      } else {
        toast.success(type === 'admin' ? 'Modified successfully' : 'Uploaded successfully!')
        setErr("")
      }
      formData = new FormData()
    }
    catch (error) {
      console.log(error)
      formData = new FormData()
      toast.error('Failed Please try again!.')
      return
    }

  }

  return (
    <div className='uploadProductForm row'>
      <form className='col-11 col-md-10' onSubmit={uploadProduct} encType="multipart/form-data">
        <fieldset className='formInfo'>
          <legend>{id ? 'Edit Existing Product' : 'Upload New Product'}</legend>
          <div>
            <label htmlFor='name'>Name:</label>
            {type === 'admin' ? (
              <>
                <input
                  className='profileInput'
                  type='text'
                  name='name'
                  value={product.name}
                  onChange={handleInputChange}
                  disabled
                />
              </>
            ) : (
              <>
                <input
                  className='profileInput'
                  type='text'
                  name='name'
                  value={product.name}
                  onChange={handleInputChange}
                  required
                />
          </>
            )}
        </div>
        <div>
          <label htmlFor='name'>Brand:</label>
          <input
            className='profileInput'
            type='text'
            name='brand'
            value={product.brand}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='name'>Type:</label>
          <select
            className='options'
            name='productType'
            onChange={handleInputChange}
            value={product.productType}
          >
            <option value={''} >---Select---</option>
            {
              typesCates && typesCates.length !== 0 && typesCates.map(ty => {
                return (<option key={ty.type} value={ty.type} >{ty.type}</option>)
              })
            }
          </select>
        </div>
        <div>
          <label htmlFor='name'>Category:</label>
          <select
            className='options'
            name='category'
            onChange={handleInputChange}
            value={product.category}
          >
            <option value={''} >---Select---</option>
            {
              categoryList && categoryList.length !== 0 && categoryList.map(cate => {
                return (<option key={cate.category} value={cate.category} >{cate.category}</option>)
              })
            }
          </select>
        </div>
        <div>
          <label htmlFor='name'>Price:</label>
          <input
            className='profileInput'
            type='number'
            name='price'
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='inStockDiv'>
          <label>Stock Available</label>
          <input type='radio' className='inStock' name='inStock' value={'true'} checked={product.inStock === 'true'} onChange={handleInputChange} /> Yes
          <input type='radio' className='inStock' name='inStock' value={'false'} checked={product.inStock === 'false'} onChange={handleInputChange} /> No
        </div>
        <div>
          <label htmlFor='name'>Discount:</label>
          <input
            className='profileInput'
            type='number'
            min={0}
            max={99}
            name='discount'
            value={product.discount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='name'>Star Rating:</label>
          <input
            className='profileInput'
            type='number'
            name='starRating'
            value={product.starRating}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='name'>Ratings:</label>
          <input
            className='profileInput'
            type='number'
            name='ratings'
            value={product.ratings}
            onChange={handleInputChange}
            required
          />
        </div>
        {type && type !== 'admin' &&
          <div>
            <label> Images: </label> <br />
            <input
              type='file'
              name='images'
              onChange={handleImages}
              multiple
            />
          </div>}
        <div>
          <label> Description: </label> <br />
          <textarea
            className='textAreaDesc'
            onChange={handleInputChange}
            name='description'
            value={product.description}
            placeholder='Share something about product...'
            rows={3}
            cols={35}
          >
          </textarea>
        </div>
        <div className='text-danger'>{err}</div>
        <div>
          <button
            type='submit'
            className='updateBtn'
          >
            Upload
          </button>
        </div>
        <ToastContainer />
      </fieldset>
    </form>
    </div >
  );
};

export default PersonalInfo;
