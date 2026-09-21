import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function Account({ user, logout }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    Promise.all([api(user.role === 'admin' ? '/admin/orders' : '/orders'), user.role === 'admin' ? api('/admin/users') : Promise.resolve([])])
      .then(([orders, users]) => { if (active) setData({ orders, users }); })
      .catch(e => { if (active) setError(e.message); });
    return () => { active = false; };
  }, [user.id, user.role]);
  return (
    <main className="page">
      <p className="eyebrow">NÉP LIVING · TÀI KHOẢN</p>
      <h1>Xin chào, {user.name}.</h1>
      <p>{user.email}</p>
      <p>Vai trò: {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</p>
      <button className="button dark" onClick={logout}>Đăng xuất</button>
      {error && <p role="alert">{error}</p>}
      {!data && !error && <p role="status">Đang tải dữ liệu…</p>}
      {data && <>
        <h2>{user.role === 'admin' ? 'Đơn hàng gần đây' : 'Đơn hàng của bạn'}</h2>
        {!data.orders.length ? <p>Chưa có đơn hàng.</p> : <ul>{data.orders.map(order => <li key={order.id}>#{order.id} · {order.status} · {Number(order.total).toLocaleString('vi-VN')} ₫</li>)}</ul>}
        {user.role === 'admin' && <>
          <h2>Tài khoản gần đây</h2>
          <p>Hiển thị tối đa 100 tài khoản.</p>
          <ul>{data.users.map(account => <li key={account.id}>{account.name} · {account.email} · {account.role}</li>)}</ul>
        </>}
      </>}
    </main>
  );
}
