import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Services from "./pages/Services";
import ServicesConsult from "./pages/ServicesConsult";
import ServicesDelivery from "./pages/ServicesDelivery";
import ServicesCare from "./pages/ServicesCare";
import News from "./pages/News";
import NewsJournal from "./pages/NewsJournal";
import NewsMaterials from "./pages/NewsMaterials";
import Contact from "./pages/Contact";
import ServiceSupport from "./pages/ServiceSupport";
import ServiceWarranty from "./pages/ServiceWarranty";
import ServiceDelivery from "./pages/ServiceDelivery";
import ServicePrivacy from "./pages/ServicePrivacy";
import ServiceBuying from "./pages/ServiceBuying";
import ServiceTerms from "./pages/ServiceTerms";
import ServicePayment from "./pages/ServicePayment";
import ServiceFreeDelivery from "./pages/ServiceFreeDelivery";
import { Header, Footer } from "./components/SiteChrome";
import { api } from './api';
import Account from './pages/Account';

function App() {
  const routeSlugs = {
    home: "",
    shop: "san-pham",
    product: "chi-tiet-san-pham",
    login: "dang-nhap",
    register: "dang-ky",
    forgot: "quen-mat-khau",
    cart: "gio-hang",
    account: 'tai-khoan',
    about: "gioi-thieu",
    services: "dich-vu",
    news: "tin-tuc",
    stories: "cau-chuyen",
    contact: "lien-he",
    "service-support": "ho-tro-khach-hang",
    "service-warranty": "chinh-sach-bao-hanh",
    "service-delivery": "giao-hang",
    "service-privacy": "bao-mat-thong-tin",
    "service-buying": "huong-dan-mua-hang",
    "service-terms": "dieu-khoan-dich-vu",
    "service-payment": "huong-dan-thanh-toan",
    "service-free-delivery": "mien-phi-giao-hang",
    "services-consult": "tu-van-khong-gian",
    "services-delivery": "giao-hang-lap-dat",
    "services-care": "cham-soc-san-pham",
    "news-journal": "nep-journal",
    "news-materials": "cau-chuyen-vat-lieu",
  };
  const routeNames = Object.fromEntries(
    Object.entries(routeSlugs).map(([key, slug]) => [slug || "home", key]),
  );
  const categorySlugs = {
    "Tất cả": "tat-ca",
    Bàn: "ban",
    Đèn: "den",
    "Phụ kiện": "phu-kien",
  };
  const getRoute = () => {
    const path = location.pathname.replace(/^\/+|\/+$/g, "");
    return (
      routeNames[(path || location.hash.slice(1) || "home").split("?")[0]] ||
      (path || "home").split("?")[0]
    );
  };
  const legacyRoute =
    location.pathname.match(/\/account\/?$/) && location.hash.slice(1);
  if (legacyRoute) window.history.replaceState(null, "", `/${legacyRoute}`);
  else if (location.hash)
    window.history.replaceState(null, "", `/${location.hash.slice(1)}`);
  const [route, setRoute] = useState(() => getRoute() + location.search);
  const [cartItems, setCartItems] = useState([]);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const authEpoch = useRef(0);
  useEffect(() => {
    let active = true;
    const epoch = authEpoch.current;
    localStorage.removeItem('nep-living-user');
    api('/auth/me').then(async account => {
      const items = await api('/cart');
      if (active && epoch === authEpoch.current) { setUser(account); setCartItems(items); }
    }).catch(error => {
      if (active && epoch === authEpoch.current && error.status !== 401) setNotice('Không thể kiểm tra phiên đăng nhập. Vui lòng thử lại.');
    }).finally(() => { if (active) setAuthLoading(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    const onPopState = () => setRoute(getRoute() + location.search);
    addEventListener("popstate", onPopState);
    return () => removeEventListener("popstate", onPopState);
  }, []);
  const navigate = (page) => {
    let [routeName] = page.split("?");
    if (['cart', 'account'].includes(routeName) && !user) routeName = 'login';
    const query = page.includes("?")
      ? `?${new URLSearchParams(page.split("?")[1].replace("category=Phòng khách", "category=tat-ca").replace("category=Tất cả", "category=tat-ca").replace("category=Bàn", "category=ban").replace("category=Đèn", "category=den").replace("category=Phụ kiện", "category=phu-kien"))}`
      : "";
    const slug = routeSlugs[routeName] ?? routeName;
    window.history.pushState(null, "", slug ? `/${slug}${query}` : `/${query}`);
    setRoute(routeName + (location.search || ""));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleApiError = (error) => {
    setNotice(error.message);
    if (error.status === 401) { authEpoch.current++; setUser(null); setCartItems([]); navigate('login'); }
  };
  const add = async (product) => {
    if (!product) return;
    if (authLoading) { setNotice('Đang kiểm tra phiên đăng nhập, vui lòng chờ.'); return; }
    if (!user) {
      setPendingProduct(product);
      navigate("login");
      return;
    }
    const epoch = authEpoch.current;
    try {
      const items = await api('/cart', { method: 'POST', body: JSON.stringify({ productId: product.id }) });
      if (epoch !== authEpoch.current) return;
      setCartItems(items);
      setNotice('Đã thêm sản phẩm vào giỏ hàng.');
    } catch (error) { if (epoch === authEpoch.current) handleApiError(error); }
  };
  const handleAuth = async (account) => {
    const epoch = ++authEpoch.current;
    setAuthLoading(false);
    setUser(account);
    setNotice('');
    setCartItems([]);
    try {
      const items = await api('/cart', pendingProduct ? { method: 'POST', body: JSON.stringify({ productId: pendingProduct.id }) } : {});
      if (epoch !== authEpoch.current) return;
      setCartItems(items);
      setPendingProduct(null);
    } catch (error) { if (epoch === authEpoch.current) handleApiError(error); }
  };
  const removeFromCart = async (index) => {
    const epoch = authEpoch.current;
    try {
      const items = await api(`/cart/${cartItems[index].cartId}`, { method: 'DELETE' });
      if (epoch === authEpoch.current) setCartItems(items);
    } catch (error) { if (epoch === authEpoch.current) handleApiError(error); }
  };
  const logout = async () => {
    try {
      await api('/auth/logout', { method: 'POST' });
      authEpoch.current++;
      setUser(null); setCartItems([]); setPendingProduct(null); setNotice('Đã đăng xuất.'); navigate('home');
    } catch (error) { handleApiError(error); }
  };
  const pages = {
    account: user ? <Account key={user.id} user={user} logout={logout} /> : <Auth navigate={navigate} onAuth={handleAuth} />,
    home: <Home navigate={navigate} add={add} />,
    shop: <Shop navigate={navigate} add={add} />,
    product: <ProductDetail add={add} navigate={navigate} />,
    login: <Auth navigate={navigate} onAuth={handleAuth} />,
    register: <Auth register navigate={navigate} onAuth={handleAuth} />,
    forgot: <ForgotPassword navigate={navigate} />,
    cart: user ? (
      <Cart navigate={navigate} items={cartItems} remove={removeFromCart} />
    ) : (
      <Auth navigate={navigate} onAuth={handleAuth} />
    ),
    about: <About navigate={navigate} />,
    stories: <NewsJournal navigate={navigate} />,
    services: <Services navigate={navigate} />,
    news: <News navigate={navigate} />,
    contact: <Contact navigate={navigate} />,
    "services-consult": <ServicesConsult navigate={navigate} />,
    "services-delivery": <ServicesDelivery navigate={navigate} />,
    "services-care": <ServicesCare navigate={navigate} />,
    "news-journal": <NewsJournal navigate={navigate} />,
    "news-materials": <NewsMaterials navigate={navigate} />,
    "service-support": <ServiceSupport navigate={navigate} />,
    "service-warranty": <ServiceWarranty navigate={navigate} />,
    "service-delivery": <ServiceDelivery navigate={navigate} />,
    "service-privacy": <ServicePrivacy navigate={navigate} />,
    "service-buying": <ServiceBuying navigate={navigate} />,
    "service-terms": <ServiceTerms navigate={navigate} />,
    "service-payment": <ServicePayment navigate={navigate} />,
    "service-free-delivery": <ServiceFreeDelivery navigate={navigate} />,
  };
  return (
    <>
      <Header navigate={navigate} cart={cartItems.length} user={user} logout={logout} />
      {notice && <p role="status" style={{ padding: '12px 5.5vw' }}>{notice}</p>}
      <div className="route-shell" key={route}>
        {authLoading && ['cart', 'account'].includes(route.split('?')[0]) ? <p role="status">Đang kiểm tra phiên đăng nhập…</p> : pages[route.split("?")[0]] || pages.home}
      </div>
      <Footer navigate={navigate} />
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
