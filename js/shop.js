/**
 * OYANGE PORTFOLIO - SHOP LOGIC
 */

const products = [
    {
        id: 1,
        title: "Mara Dawn",
        price: "KES 15,000",
        description: "Wide savanna landscape with warm sunrise lighting",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr8zAMtG4pxSVCVgIzzS7Trn2hCudHpfc8JJ-QZVX9tGuSFcAyv8JHEyi1PTK3y2PNv3g8mM-vNQDhOkaJuf2ziyldbaqyxMltLerGPDc97bEacXG53U6SBYXyfq8UT8-WiBU0klEp7JL0rzqJq2GAzEdo2oqfsVXJ4ntPFr2-iFMXRkjHVKvmfazCgbkw0u4UqDbrB4gjK1VWcqp7qpFNcBhTHE_PBafZpSFsZ374CmP2_KBXjIDwm5pvRKIk98DoKgFaVoboAhgl"
    },
    {
        id: 2,
        title: "Elder's Gaze",
        price: "KES 15,000",
        description: "Close up portrait of an elder with wise eyes",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxYRUMYoeuwB_YFxMkOkbj6O9qDieCcfA7aMS1hTQ0YZVPZ2eKpLZ1Lv5eqHY0uEH8-T2JNSPx0RRj5t03RpzNGtzL-KenHAF7lHw5VafTpV6h2ZhS9xyR20YHugBQxkZDcjAXJ_RtjTzD4rWPQDGy257rwNox169tnPtNZ_oLbTPWwMW9POkE1Dfb7ufH8WWc4qV8vtBv3HK_TAT1UkECboo6fWaaQUOjNrnMHonjyEDbcexDlERfbiZRNjl--pQ1rvOSe1sBgtnF"
    },
    {
        id: 3,
        title: "CBD Rush",
        price: "KES 12,500",
        description: "Busy Nairobi street scene with blurred movement",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3TExchGyq40HPuC1vFvu7CpI_jcOloVbbOShx2BWF_EsWHHcL5ms2jKcm0qQt8Y9Yk9DDe8jdq7ODcyYfXh-6NlCveVdoQ47HyUCQht45-BnVfB9eh6U7OERKoZvoUEm5WD3ZDbm2KFUE74Ho5pIuJyxbQ0nImeuIh1ox5YTOhvEcQFcgMkp4fVvrlJipFQlbuqVA54Yt5LglAyYEWMqGTFv5syjY9GEhNtFb3OVrbLhznzbR7RMoGN68hqOrquTkKGpuHtxTltPd"
    },
    {
        id: 4,
        title: "KICC Angles",
        price: "KES 12,500",
        description: "Abstract geometric angles of the KICC building",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNX9ERC2nHjpw99P3XWESIui_sQgW90NKtQBRopze4vdLpSOadmIlWyQAqMYXJn0YtbkWgtFyaeF7suALl3ntKS4IB-QydEaz_wTiLypjpHdtkihtvbYL_rkq-wZAooqV8-zqlFeSX1Dj8IZUl2Ai58oTFq7kv8G9i8b04Zs5gXt69x0I6arGq9JwW_1gkgx0B07KLswTt9ygQBmBd6EZTsiHom-bm2fbgPGqxeqwLg31KtDVDfdzZUsS7gMi0sAnIRpT7oee0B94S"
    }
];

const whatsappNumber = '254700000000'; // Replace with actual Kenyan number

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <article class="group flex flex-col gap-6">
            <!-- Frame/Image -->
            <div class="relative bg-white p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out aspect-[4/5] flex items-center justify-center overflow-hidden">
                <div class="w-full h-full relative overflow-hidden bg-gray-100">
                    <img 
                        src="${product.image}" 
                        alt="${product.title}" 
                        class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                </div>
            </div>

            <!-- Details -->
            <div class="flex flex-col items-center text-center space-y-3">
                <h3 class="font-display font-bold text-2xl text-brand-dark">${product.title}</h3>
                <div class="text-xs font-bold tracking-widest text-brand-dark/40 uppercase">
                    A4 <span class="mx-2 text-brand-gold">|</span> A3 <span class="mx-2 text-brand-gold">|</span> A2
                </div>
                <p class="text-brand-gold font-display font-bold text-xl">${product.price}</p>
                
                <a 
                    href="https://wa.me/${whatsappNumber}?text=Hi! I'm interested in purchasing the '${encodeURIComponent(product.title)}' print (${product.price}). Please let me know how to proceed."
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-2 w-full max-w-[280px] h-12 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform active:scale-95"
                >
                    <span class="material-symbols-outlined text-xl">chat</span>
                    <span class="font-bold text-sm">Buy via WhatsApp</span>
                </a>
            </div>
        </article>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('products-grid')) {
        renderProducts();
    }
});
