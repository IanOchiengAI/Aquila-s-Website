import React from 'react';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;
}

const products: Product[] = [
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

const ShopSection: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-cream">
      <div className="text-center mb-20">
        <h2 className="font-display font-bold text-5xl md:text-7xl text-primary mb-6">PRINT SHOP</h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
        <p className="text-primary/60 font-light text-lg">
          Limited edition archival prints from Nairobi. <br /> Curated for the modern collector.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
        {products.map((product) => (
          <article key={product.id} className="group flex flex-col gap-6">
            {/* Frame/Image */}
            <div className="relative bg-white p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out aspect-[4/5] flex items-center justify-center overflow-hidden">
               <div className="w-full h-full relative overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
               </div>
            </div>

            {/* Details */}
            <div className="flex flex-col items-center text-center space-y-3">
              <h3 className="font-display font-bold text-2xl text-primary">{product.title}</h3>
              <div className="text-xs font-bold tracking-widest text-primary/40 uppercase">
                A4 <span className="mx-2 text-gold">|</span> A3 <span className="mx-2 text-gold">|</span> A2
              </div>
              <p className="text-gold font-display font-bold text-xl">{product.price}</p>
              
              <button className="mt-2 w-full max-w-[280px] h-12 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform active:scale-95">
                <span className="material-symbols-outlined text-xl">chat</span>
                <span className="font-bold text-sm">Buy via WhatsApp</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ShopSection;