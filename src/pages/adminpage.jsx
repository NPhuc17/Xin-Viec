import React from 'react';
import Leftside from '../features/admin/leftside';
import { Outlet } from 'react-router-dom';

function Adminpage() {
  return (
    <div className="flex min-h-screen">
      <Leftside />
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

export default Adminpage;