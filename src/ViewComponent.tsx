// src/components/ViewSecondsComponent.tsx
import React from 'react';
import useUniqViewSeconds from './useUniqViewSeconds';

const ViewComponent: React.FC = () => {
  const { data, loading, error } = useUniqViewSeconds('https://664ac067a300e8795d42d1ff.mockapi.io/api/v1/numbers/1');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Unique View Seconds</h2>
      <div>{data}</div>
    </div>
  );
};

export default ViewComponent;
