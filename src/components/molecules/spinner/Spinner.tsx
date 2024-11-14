import React from 'react';

const Spinner: React.FC = () => {
   return (
        <div className="spinner-border text-primary text-center my-4 mx-auto" role="status" data-testid="spinner">
            <span className="sr-only"></span>
        </div>
    );
};

export default Spinner;
