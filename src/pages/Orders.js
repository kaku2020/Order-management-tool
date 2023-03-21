import React, { useState, useEffect } from 'react';
import './Orders.css';
import Ordersdata from '../data/OrdersData.js';
import userData from "../data/LoginData.js";

function Orders() {
  const [selectedorder, setSelectedOrder] = useState([]);
  const [currOrderUser, setCurrOrderUser] = useState({});
  const [search, setSearch] = useState('');
  const [curr_page, setPage] = useState(1);
  const [num_row, setRow] = useState(10);

  useEffect(() => {
    try {
      let user_id = sessionStorage.getItem('userid');
      let userorder = Ordersdata.filter((item) => item.userId === user_id);
      let currUser = userData.filter((item) => item.id === user_id);
      debugger
      console.log(currUser)
      if(currUser !== undefined){
        setCurrOrderUser({id : currUser[0].id , email : currUser[0].email });
      }
      
      setSelectedOrder(userorder);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const show = () => {
    console.log(Ordersdata);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredData = selectedorder.filter((item) => {
    return (
      item.orderId.includes(search) ||
      item.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      item.pickupDate.includes(search) ||
      item.status.toLowerCase().includes(search.toLowerCase())
    );
  });

  const last_index = curr_page * num_row;
  const first_index = last_index - num_row;
  const current_rows = filteredData.slice(first_index, last_index);

  return (
    <div className='orders__container' key='orders__container'>
      <div className='orders__header'>
      <h1 className='orders__header-data'>User Id : {currOrderUser.id}</h1>
      <h1 className='orders__header-data'>Orders Page</h1>
      <h1 className='orders__header-data'>{currOrderUser.email}</h1>
      </div>
      <input
        type='text'
        value={search}
        onChange={handleSearch}
        className='orders__search'
        data-testid="orders__search"
      />
      <table className='orders__table'>
        <thead>
          <tr>
            <th className='orders__table-head'>Order Id</th>
            <th className='orders__table-head'>Vendor Id</th>
            <th className='orders__table-head'>Pickup Date</th>
            <th className='orders__table-head'>Status</th>
          </tr>
        </thead>
        <tbody>
          {current_rows.map((item) => (
            <tr key={item.orderId}>
              <td className='orders__table-data'>{item.orderId}</td>
              <td className='orders__table-data'>{item.vendorName}</td>
              <td className='orders__table-data'>{item.pickupDate}</td>
              <td className='orders__table-data'>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        count={Math.ceil(filteredData.length / num_row)}
        page={curr_page}
        rows={num_row}
        onChange={handlePageChange}
        className='orders__pagination'
      />
      {show()}
    </div>
  );
}

const Pagination = ({ count, page, rows, onChange, className }) => {
  const page_num = [...Array(count).keys()].map((number) => number + 1);
  return (
    <nav className={className}>
      <ul className='orders__pagination-list'>
        {page_num.map((number) => {
          return (
            <li key={number} className='orders__pagination-item'>
              <button
                onClick={() => onChange(null, number)}
                disabled={page === number}
                className='orders__pagination-button'
                data-testid={number}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Orders;

