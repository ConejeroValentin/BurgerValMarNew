import { useState, useEffect } from "react";
import "./App.css";

import classicImg from "./assets/classic.png";
import cheeseImg from "./assets/Especial.png";
import brutalImg from "./assets/brutal.png";

function App() {
  const [order, setOrder] = useState({
    classic: 0,
    cheese: 0,
    brutal: 0,
    promoClassic: 0,
    promoCheese: 0,
    promoSurtida: 0,
    promoBrutal: 0,
  });

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [total, setTotal] = useState(0);

  // Precios
  const priceClassic = 5000;
  const priceCheese = 6000;
  const priceBrutal = 15000;

  const promoPrice = 20000;
  const promoBrutalPrice = 60000;

  const hamburguesas = [
    {
      type: "classic",
      label: "Classic",
      img: classicImg,
      price: priceClassic,
    },
    {
      type: "cheese",
      label: "Especial",
      img: cheeseImg,
      price: priceCheese,
    },
    {
      type: "brutal",
      label: "BRUTAL 🍔",
      img: brutalImg,
      price: priceBrutal,
      desc: "3 medallones, 3 quesos, tomate y huevo",
    },
  ];

  const promos = [
    { type: "promoClassic", label: "Classic x4", price: promoPrice },
    { type: "promoCheese", label: "Cheese x4", price: promoPrice },
    { type: "promoSurtida", label: "Promo Surtida x4", price: promoPrice },
    { type: "promoBrutal", label: "BRUTAL x4 💣", price: promoBrutalPrice },
  ];

  const addItem = (type) =>
    setOrder((prev) => ({ ...prev, [type]: prev[type] + 1 }));

  const removeItem = (type) =>
    setOrder((prev) => ({
      ...prev,
      [type]: Math.max(prev[type] - 1, 0),
    }));

  useEffect(() => {
    let subtotal = 0;
    hamburguesas.forEach((h) => {
      subtotal += order[h.type] * h.price;
    });
    promos.forEach((p) => {
      subtotal += order[p.type] * p.price;
    });
    setTotal(subtotal);
  }, [order]);

  const sendWhatsApp = () => {
    if (!fecha || !hora) {
      alert("Ingrese fecha y hora del pedido.");
      return;
    }

    let message = "Hola, quiero ordenar:\n\n";

    [...hamburguesas, ...promos].forEach((item) => {
      if (order[item.type] > 0) {
        message += `${order[item.type]} x ${item.label}\n`;
      }
    });

    message += `\nTotal: ${total}$\nFecha: ${fecha}\nHora: ${hora}`;

    const encoded = encodeURIComponent(message);
    window.open(
      `https://wa.me/5492616136651?text=${encoded}`,
      "_blank"
    );
  };

  const carrito = [...hamburguesas, ...promos].filter(
    (item) => order[item.type] > 0
  );

  return (
    <div className="container">
      <h1 className="title">🍔 VALMAR BURGER MDZ 🍔</h1>

      <div className="grid">
        {hamburguesas.map((h) => (
          <div key={h.type} className="card">
            <img src={h.img} alt={h.label} className="img" />
            <div className="label">{h.label}</div>
            {h.desc && <small>{h.desc}</small>}
            <div>{h.price}$ c/u</div>

            <div className="counter">
              <button className="btn" onClick={() => addItem(h.type)}>
                ➕
              </button>
              <button className="btn" onClick={() => removeItem(h.type)}>
                ➖
              </button>
              <div>{order[h.type]}</div>
            </div>
          </div>
        ))}

        {promos.map((p) => (
          <div key={p.type} className="card">
            <div className="label">{p.label}</div>
            <div>{p.price}$</div>
            <div className="counter">
              <button className="btn" onClick={() => addItem(p.type)}>
                ➕
              </button>
              <button className="btn" onClick={() => removeItem(p.type)}>
                ➖
              </button>
              <div>{order[p.type]}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="datetime">
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </label>

        <label>
          Hora:
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </label>
      </div>

      {carrito.length > 0 && (
        <div className="cart">
          <h3>🛒 Resumen del pedido</h3>

          {carrito.map((item) => (
            <div key={item.type} className="cart-item">
              <span>{item.label}</span>
              <span>
                {order[item.type]} x {item.price}$ ={" "}
                {order[item.type] * item.price}$
              </span>
            </div>
          ))}

          <div className="total">Total: {total}$</div>
        </div>
      )}

      <button className="whatsapp-btn" onClick={sendWhatsApp}>
        📲 Enviar a WhatsApp
      </button>

      {/* RESEÑAS */}
      <div className="reviews">
        <h2>📸 Comentarios de clientes</h2>
        <p>Subí fotos de reseñas de nuestras hamburguesas</p>
        <input type="file" accept="image/*" multiple />
      </div>
    </div>
  );
}

export default App;

