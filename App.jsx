import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [order, setOrder] = useState({
    classic: 0,
    cheese: 0,
    promoClassic: 0,
    promoCheese: 0,
    promoSurtida: 0,
  });

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [total, setTotal] = useState(0);

  const price = 5000;
  const price2 = 6000;
  const promoPrice = 20000;

  const hamburguesas = [
    { type: "classic", label: "Classic", img: "https://bk-latam-prod.s3.amazonaws.com/sites/burgerking.com.py/files/hamburguesa.png", price },
    { type: "cheese", label: "Especial", img: "https://w7.pngwing.com/pngs/772/330/png-transparent-hamburger-buffalo-wing-cheeseburger-french-fries-hot-dog-buffalo-wings-food-cheese-cheeseburger.png", price: price2 },
  ];

  const promos = [
    { type: "promoClassic", label: "Classic x4", price: promoPrice },
    { type: "promoCheese", label: "Cheese x4", price: promoPrice },
    { type: "promoSurtida", label: "Promo Surtida x4", price: promoPrice },
  ];

  const addItem = (type) => setOrder(prev => ({ ...prev, [type]: prev[type] + 1 }));
  const removeItem = (type) => setOrder(prev => ({ ...prev, [type]: Math.max(prev[type] - 1, 0) }));

  useEffect(() => {
    let subtotal = 0;
    hamburguesas.forEach(h => subtotal += order[h.type] * h.price);
    promos.forEach(p => subtotal += order[p.type] * p.price);
    setTotal(subtotal);
  }, [order]);

  const sendWhatsApp = () => {
    if (!fecha || !hora) { alert("Ingrese fecha y hora del pedido."); return; }

    let message = "Hola, quiero ordenar:\n";
    [...hamburguesas, ...promos].forEach(item => {
      if (order[item.type]) message += `${order[item.type]} x ${item.label}\n`;
    });
    message += `Total: ${total}₲\nFecha: ${fecha}\nHora: ${hora}`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5492616136651?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
  };

  const carrito = [...hamburguesas, ...promos].filter(item => order[item.type] > 0);

  return (
    <div className="container">
      <h1 className="title">🍔 VALMAR BURGER MDZ 🍔</h1>

      <div className="grid">
        {hamburguesas.map(h => (
          <div key={h.type} className="card">
            <img src={h.img} alt={h.label} className="img" />
            <div className="label">{h.label}</div>
            <div>{h.price}$ c/u</div>
            <div className="counter">
              <button className="btn" onClick={() => addItem(h.type)}>➕</button>
              <button className="btn" onClick={() => removeItem(h.type)}>➖</button>
              <div>{order[h.type]}</div>
            </div>
          </div>
        ))}

        {promos.map(p => (
          <div key={p.type} className="card">
            <div className="label">{p.label}</div>
            <div className="counter">
              <button className="btn" onClick={() => addItem(p.type)}>➕</button>
              <button className="btn" onClick={() => removeItem(p.type)}>➖</button>
              <div>{order[p.type]}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label>Fecha: <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} /></label>
        <br/>
        <label>Hora: <input type="time" value={hora} onChange={e => setHora(e.target.value)} /></label>
      </div>

      {carrito.length > 0 && (
        <div className="cart">
          <h3>🛒 Resumen del pedido</h3>
          {carrito.map(item => (
            <div key={item.type} className="cart-item">
              <span>{item.label}</span>
              <span>{order[item.type]} x {item.price}$ = {order[item.type]*item.price}$</span>
            </div>
          ))}
          <div className="total">Total: {total}$</div>
        </div>
      )}

      <button className="whatsapp-btn" onClick={sendWhatsApp}>📲 Enviar a WhatsApp</button>
    </div>
  );
}

export default App;
