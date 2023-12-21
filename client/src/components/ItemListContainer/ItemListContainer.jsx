import ItemList from '../ItemList/ItemList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ItemListContainer(props) {
    const [products, setProducts] = useState([]);
    const { productCat } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = '/api/products';

                if (productCat) {
                    url += `?category=${productCat}`;
                }

                const response = await fetch(url);
                const responseData  = await response.json();

                setProducts(responseData.payload);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [productCat]);

    return (
        <div className="mt-5" style={{ textAlign: 'center' }}>
            <h2 className="text-center">{props.greeting}</h2>
            <ItemList products={products} />
        </div>
    );
}

export default ItemListContainer;
