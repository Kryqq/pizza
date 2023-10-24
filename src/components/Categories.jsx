import React from 'react';

function Categories() {
   const [activeIndex, setActiveIndex] = React.useState();

   const onClickCategory = (index) => {
      setActiveIndex(index);
   };

   const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
   return (
      <div className="categories">
         <ul>
            {categories.map((item, index) => (
               <li
                  onClick={() => {
                     onClickCategory(index);
                  }}
                  className={activeIndex === index ? 'active' : ''}
               >
                  {item}
               </li>
            ))}
         </ul>
      </div>
   );
}

export default Categories;
