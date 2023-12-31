import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
const FullPizza: React.FC = () => {
   const [pizza, setPizza] = React.useState<{
      imageurl: string;
      title: string;
      price: number;
	}>();
   let { id } = useParams();
   let navigate = useNavigate();
   React.useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get(`https://653a70a02e42fd0d54d3e7e7.mockapi.io/Items/${id}`);
            setPizza(data);
         } catch (error) {
            console.log('fullpizza error');
            navigate('/');
         }
      }
      fetchPizza();
   }, []);

   if (!pizza) {
      return <>'Загрузка...'</>;
   }

   return (
      <div>
         <img src={pizza.imageurl} alt="pizza" />
         <h2>{pizza.title}</h2>
         <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deserunt tempore totam fugiat optio
            assumenda magni magnam. Ipsum laudantium ab ipsam dolore iste consequuntur nemo mollitia perspiciatis,
         </p>
         <h4>{pizza.price} р</h4>
      </div>
   );
};

export default FullPizza;
