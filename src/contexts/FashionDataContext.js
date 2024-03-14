import { createContext, useState } from "react"

export const FashionDataContext = createContext()

const FashionDataContextProvider = ({ children }) =>{
    const initialState = [
        {
          category: "Shirts",
          sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XS'],
          colors: ['White', 'Blue', 'Red', 'Black', 'Light Blue', 'Pink', 'Cream', 'Grey', 'Navy']
        },
        {
            category: "T-Shirts",
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XS'],
            colors: ['White', 'Blue', 'Red', 'Black', 'Light Blue', 'Pink', 'Cream', 'Grey', 'Navy']
        },
        {
            category: "Formal-Shirts",
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XS'],
            colors: ['White', 'Blue', 'Red', 'Black', 'Light Blue', 'Pink', 'Cream', 'Grey', 'Navy']
        },
        {
          category: "Winter Wear",
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          colors: ['Charcoal', 'Burgundy', 'Forest Green', 'Navy', 'Camel', 'Olive Green']
        },
        {
            category: "Jeans & Trousers",
            sizes: ['28', '30', '32', '34', '36','38', '40'],
            colors: ['Indigo Blue', 'Black', 'Khaki', 'Grey', 'Dark Brown', 'Brown', 'Beige']
        },
        {
          category: "Shorts",
          sizes: ['28', '30', '32', '34', '36', '40'],
          colors: ['Indigo Blue', 'Black', 'Khaki', 'Grey', 'Dark Brown', 'Brown', 'Beige']
        },
        {
            category: "Dresses",
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: ['Floral Print', 'Black', 'Navy', 'Burgundy', 'White', 'Red', 'Yellow', 'Purple', 'Teal']
        },
        {
            category: "Kurtas",
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['White', 'Blue', 'Mustard', 'Maroon', 'Green', 'Brown', 'Pink', 'Orange', 'Grey']
        }
    ]
    const [fashionData, setFashionData] = useState(initialState);
    
    return (
        <FashionDataContext.Provider value={{fashionData}}>
            { children }
        </FashionDataContext.Provider>
    )
}

export default FashionDataContextProvider

  