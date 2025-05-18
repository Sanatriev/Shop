const products = [
    {
      id: 1,
      name: 'Футболка',
      price: 2500,
      image: 'https://usneakersport.ru/image/cache/catalog/shop/apparel/supreme-spiderweb-football-jersey-white-700x700.jpg'
    },
    {
      id: 2,
      name: 'Кросівки',
      price: 8000,
      image : 'https://rozmir.in.ua/content/images/6/536x536l50nn0/krossovky-asics-gel-quantum-kinetic-silver-white-black-39415636248829.jpg'
    },
    {
      id: 3,
      name: 'Штани',
      price: 2000,
      image: 'https://image-thumbs.shafastatic.net/-803774508_310_430'
    },
    {
      id: 4,
      name: 'Куртка',
      price: 3000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKjSvzxw49ZK7sd1TfQv-vWfQF4rPUrkb-DQ&s'
    },
    {
      id: 5,
      name: 'Сумка',
      price: 1200,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IqsoLYq3v5bpAe-mmt4aDEUQoD2WvYBmaw&s'
    },
    {
      id: 6,
      name: 'Годинник',
      price: 550000,
      image: 'https://watches-master.ua/uploads/files/CatalogProducts/images_46680/967b16.jpg'
    },
    {
      id: 6,
      name: 'Рюкзак',
      price: 10000,
      image: 'https://cc98ea11-9cf2-4cd4-b74d-bbd51bc86f3d.selcdn.net/images/d_large/167654300.jpg'
    },
    {
      id: 6,
      name: 'Окуляри',
      price: 3000,
      image: 'https://images.shafastatic.net/-63576383'
    },
    {
      id: 6,
      name: 'Джинси',
      price: 3000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJTItCBdaN7o_TF9h6ZXLrZ3M_Hs0Tg4O5sA&s'
    },
    {
      id: 6,
      name: 'Крокси',
      price: 3000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOtURGX_ZY9J3nUA1Eq0xEpdKOsFOqJMGs4Q&s'
    },
  ];

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderProducts() {
    const container = document.getElementById('products');
    container.innerHTML = '';
    products.forEach(p => {
      const el = document.createElement('div');
      el.className = 'product';
      el.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Ціна: ${p.price} грн</p>
        <button onclick="addToCart(${p.id})">Купити</button>`
      ;
      container.appendChild(el);
    });
  }

  function renderCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    if (cart.length === 0) {
      cartDiv.innerHTML = '<p>Кошик порожній.</p>';
      return;
    }

    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        ${item.name} x${item.quantity} - ${item.price * item.quantity} грн
        <button onclick="removeFromCart(${item.id})">-</button>`
      ;
      cartDiv.appendChild(itemEl);
    });

    const totalEl = document.createElement('p');
    totalEl.innerHTML = `<strong>Загальна сума: ${total} грн</strong>`;
    cartDiv.appendChild(totalEl);
  }

  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    showNotification(`${product.name} додано в кошик`);
    renderCart();
  }

  function removeFromCart(id) {
    const index = cart.findIndex(i => i.id === id);
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
    }
    saveCart();
    renderCart();
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function showNotification(msg) {
    const notif = document.getElementById('notification');
    notif.textContent = msg;
    notif.style.display = 'block';
    setTimeout(() => notif.style.display = 'none', 2000);
  }

  renderProducts();
  renderCart();
