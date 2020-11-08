import React from 'react';
import TableViewContainer from './containers/Home/TableViewContainer';
import CustomLayout from './containers/Layout/CustomLayout';

const App = () => {
  return (
    <CustomLayout>
      <TableViewContainer />
    </CustomLayout>
  );
};
export default App;
