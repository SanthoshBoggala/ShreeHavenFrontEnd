import { useContext } from "react"
import { SelectedFilters } from "../../contexts/SelectedFilters"


const FilterInput = ({ categoryType }) => {

    const { filters, setFilters } = useContext(SelectedFilters)
    const notCates = ['priceUnder', 'sortOption', 'ratings', 'search']

    const handleChange = (e) => {
        const {name, value, checked, type} = e.target
        const updatedValue = type === 'checkbox' ? checked : value;
        setFilters(prev => ({...prev, [name]: updatedValue}))
    }
    return (
        <>
            {!notCates.includes(categoryType) && (
                <>
                    <div className="filterInput">
                        <input
                            className='styleInput'
                            type="checkbox"
                            name={categoryType}
                            checked={filters[categoryType]}
                            onChange={handleChange}
                        />
                        <label className="styleLabel">
                            {categoryType}
                        </label>
                        <br />
                    </div>
                </>
            )
            }
            {categoryType === 'priceUnder' && (
                <>
                    <div className="filterInput">
                        <label className="priceLabel"> Price Under </label> <br />
                        <input
                            className='stylePrice'
                            type="number"
                            name={categoryType}
                            value={filters[categoryType]}
                            onChange={handleChange}
                        />
                        <br />
                    </div>
                </>
            )
            }
            {categoryType === 'sortOption' && (
                <>
                    <div className="filterInput">
                        <label className="priceLabel"> Order </label> <br />
                        <input
                            className='styleInput'
                            type="radio"
                            name={categoryType}
                            value="1"
                            checked={filters[categoryType] == '1'}
                            onChange={handleChange}
                        />
                        <label className="styleLabel">Low to High </label>
                        <br />
                        <input
                            className="styleInput"
                            type="radio"
                            name={categoryType}
                            value='-1'
                            checked={filters[categoryType] == '-1'}
                            onChange={handleChange}
                        />
                        <label className="styleLabel"> High to Low </label>
                        <br />
                    </div>
                </>
            )
            }
            {
                categoryType === 'ratings' && (
                    <div className="filterInput">
                        <label className="customerRatings"> Customer Ratings </label> <br />
                        <input type='radio' className='' name={categoryType} value={'4'} checked={filters[categoryType] == '4'} onChange={handleChange} /> 4 <span className='star'>★</span>& above <br />
                        <input type='radio' className='' name={categoryType} value={'3'} checked={filters[categoryType] == '3'} onChange={handleChange} /> 3 <span className='star'>★</span>& above <br />
                        <input type='radio' className='' name={categoryType} value={'2'} checked={filters[categoryType] == '2'} onChange={handleChange} /> 2 <span className='star'>★</span>& above <br />
                        <input type='radio' className='' name={categoryType} value={'1'} checked={filters[categoryType] == '1'} onChange={handleChange} /> 1 <span className='star'>★</span>& above <br />
                    </div>
                )
            }
        </>
    )
}

export default FilterInput