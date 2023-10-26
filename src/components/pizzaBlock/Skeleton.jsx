import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
   <ContentLoader  className = 'pizza-block 'speed={2} width={280} height={500} viewBox="0 0 280 500" backgroundColor="#f1efef" foregroundColor="#ecebeb" >
        <circle cx="140" cy="129" r="129" /> 
    <rect x="0" y="281" rx="9" ry="9" width="280" height="25" /> 
    <rect x="152" y="424" rx="10" ry="10" width="125" height="30" /> 
    <rect x="5" y="424" rx="10" ry="10" width="95" height="30" /> 
    <rect x="0" y="320" rx="9" ry="9" width="280" height="88" />
   </ContentLoader>
);

export default Skeleton;
