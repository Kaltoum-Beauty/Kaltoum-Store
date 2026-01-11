// توليد 300 منتج (100 لكل قسم)
const products = [];
const categories = ["العناية بالشعر", "العناية بالبشرة", "العناية بالجسم"];

categories.forEach(cat => {
    for (let i = 1; i <= 100; i++) {
        products.push({
            id: `${cat}-${i}`,
            name: `${cat} - موديل ${i}`,
            price: Math.floor(Math.random() * 300) + 60,
            category: cat,
            img: `https://plus.unsplash.com/premium_photo-1679046839043-321fb0231d44?w=500&sig=${cat}${i}`
        });
    }
});
// إضافة منتج RUBELLA يدوياً في البداية
products.unshift({
    id: "hair-care-rubella",
    name: "RUBELLA - زيت العناية الفائق",
    price: 170,
    category: "العناية بالشعر",
    img: "RUBELLA.png", // تأكد من وجود الصورة بنفس المجلد أو استخدم رابطاً مباشراً
    rating: 5,
    reviews: 64
});
{
    id: 2,
    name: "Vitamin B7 Biotin Shampoo",
    price: 99,
    img: "biotin.png",
    category: "hair",
    description: "شامبو البيوتين B7 الاحترافي بتركيبة Triplex Hair System. يعمل على تقوية بصيلات الشعر، زيادة الكثافة، ومنع التساقط. غني ببروتين القمح وزيت الأرغان والكولاجين. خالي من السلفات والسيليكون والبارابين."
}

let cart = [];

function render(catName = 'الكل') {
    const list = document.getElementById('product-list');
    const filtered = catName === 'الكل' ? products : products.filter(p => p.category === catName);
    
    list.innerHTML = filtered.map(p => `
        <div class="product-card">
            <span class="discount-badge">تخفيض!</span>
            <img src="${p.img}" alt="${p.name}">
            <div class="card-body">
                <h4>${p.name}</h4>
                <span class="price-tag">${p.price} DH <small class="old-price">${p.price + 50} DH</small></span>
                <button class="buy-btn" onclick="addToCart('${p.id}')">
                    <i class="fas fa-shopping-basket"></i> إضافة للسلة
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCart();
    document.getElementById('sidebar').classList.add('active');
}

function updateCart() {
    document.getElementById('count').innerText = cart.length;
    let total = 0;
    document.getElementById('cart-items').innerHTML = cart.map((item, idx) => {
        total += item.price;
        return `<div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #f9f9f9; padding-bottom:5px;">
            <span>${item.name}</span> <b>${item.price} DH</b>
        </div>`;
    }).join('');
    document.getElementById('total').innerText = total;
}

function filterCat(name) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    render(name);
}

function toggleCart() { document.getElementById('sidebar').classList.toggle('active'); }

function checkout() {
    if(cart.length === 0) return alert("سلتكِ فارغة!");
    const friend = document.getElementById('friend-code').value || "لا يوجد";
    const myCode = Math.floor(Math.random() * 9000000000) + 1000000000;
    const total = document.getElementById('total').innerText;
    const shipping = total >= 250 ? "مجاني ✅" : "30 درهم 🚚";
    
    let msg = `*طلب جديد - متجر أم كلثوم*%0A`;
    msg += `💎 كود الإحالة المستخدم: ${friend}%0A`;
    msg += `🎁 كود الزبونة الجديد: ${myCode}%0A%0A`;
    cart.forEach(i => msg += `- ${i.name} (${i.price} DH)%0A`);
    msg += `%0A*المجموع:* ${total} DH%0A*التوصيل:* ${shipping}`;
    
    window.open(`https://wa.me/212602105141?text=${msg}`);
}


render();

