import { useState, useEffect } from "react";
import "./App.css";

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

  // PRECIOS
  const priceClassic = 5000;
  const priceCheese = 6000;
  const promoPrice = 20000;

  // HAMBURGUESAS
  const hamburguesas = [
    {
      type: "classic",
      label: "Classic",
      img: "https://bk-latam-prod.s3.amazonaws.com/sites/burgerking.com.py/files/hamburguesa.png",
      price: priceClassic,
    },
    {
      type: "cheese",
      label: "Especial",
      img: "https://w7.pngwing.com/pngs/772/330/png-transparent-hamburger-buffalo-wing-cheeseburger-french-fries-hot-dog-buffalo-wings-food-cheese-cheeseburger.png",
      price: priceCheese,
    },
  ];

  // PROMOS
  const promos = [
    { type: "promoClassic", label: "Classic x4", price: promoPrice },
    { type: "promoCheese", label: "Especial x4", price: promoPrice },
    { type: "promoSurtida", label: "Promo surtida x4", price: promoPrice },
  ];

  // SUMAR / RESTAR
  const addItem = (type) =>
    setOrder((prev) => ({ ...prev, [type]: prev[type] + 1 }));

  const removeItem = (type) =>
    setOrder((prev) => ({ ...prev, [type]: Math.max(prev[type] - 1, 0) }));

  // TOTAL
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

  // WHATSAPP
  const sendWhatsApp = () => {
    if (!fecha || !hora) {
      alert("Ingrese fecha y hora del pedido");
      return;
    }

    let message = "Hola, quiero ordenar:\n";

    hamburguesas.forEach((h) => {
      if (order[h.type] > 0) {
        message += `${order[h.type]} Hamburguesa ${h.label}\n`;
      }
    });

    promos.forEach((p) => {
      if (order[p.type] > 0) {
        message += `${order[p.type]} ${p.label}\n`;
      }
    });

    message += `Total: $${total}\nFecha: ${fecha}\nHora: ${hora}`;

    const url = `https://wa.me/5492616136651?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const carrito = [...hamburguesas, ...promos].filter(
    (item) => order[item.type] > 0
  );

  return (
    <div className="container">
      <h1 className="title">🍔 VALMAR BURGER MDZ 🍔</h1>

      <h2 className="section-title">Hamburguesas</h2>
      <div className="grid">
        {hamburguesas.map((h) => (
          <div className="card" key={h.type}>
            <img src={h.img} alt={h.label} />
            <h3>{h.label}</h3>
            <p>${h.price} c/u</p>

            <div className="counter">
              <button onClick={() => removeItem(h.type)}>−</button>
              <span>{order[h.type]}</span>
              <button onClick={() => addItem(h.type)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Promociones x4</h2>
      <div className="grid">
        {promos.map((p) => (
          <div className="card promo" key={p.type}>
            <h3>{p.label}</h3>
            <p>${p.price}</p>

            <div className="counter">
              <button onClick={() => removeItem(p.type)}>−</button>
              <span>{order[p.type]}</span>
              <button onClick={() => addItem(p.type)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="form">
        <label>
          Fecha
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </label>

        <label>
          Hora
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
        </label>
      </div>

      {carrito.length > 0 && (
        <div className="cart">
          <h3>🛒 Resumen</h3>
          {carrito.map((item) => (
            <div className="cart-item" key={item.type}>
              <span>{item.label}</span>
              <span>{order[item.type]} x ${item.price}</span>
            </div>
          ))}
          <div className="total">Total: ${total}</div>
        </div>
      )}

      <button className="whatsapp" onClick={sendWhatsApp}>
        📲 Enviar a WhatsApp
      </button>
    </div>
  );
}

export default App;
