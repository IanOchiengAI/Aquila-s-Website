import React, { useState } from 'react';

type Category = 'ALL' | 'PEOPLE' | 'PLACES' | 'EVENTS' | 'TRAVEL';

const works = [
  {
    id: 1,
    category: 'PEOPLE',
    title: 'Nairobi Gaze',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOi-oHYLlh1Kz50h-tqIRVqVtZDQAibSrMLwifjqMyhG0pyjdO8qK4_vAtrpOEQm9939BDXvoXuqOz-epZh7yhwVh1MpENkpbvLXZNnW8j-H-iNsDpRetm3inqfHsoQlnFW7ZaLHYnoyZapfq15NpDgQzIondeOkawuEl3Rw61ddRliLQfR79Z3Fe-1T9Jk0FKndWvL0gdtj-mww7OA_6rBrjganmiPfBS_ANnkLvZ0kgdNtuCdXz74aNyzIPVTl5HeNVJptLDv5Mn',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 2,
    category: 'PLACES',
    title: 'Mara Horizons',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQWaNdLPPFjr4QYn5Zl0t0Rq-PCYToHDiMF0H59_jd2E5OuXCb2nGs7zwn6QqvI6K2g4WSCosnnK_bN33DOOXwbIP040VexMj9dkE4YDI38hlrQzedxsjWZHnTod0vHXQ-Cs5PrQorATNc_xv3NtNty36WeV4y-I4YE2STkMUez_qK4A76ySGSWqbYnXPMiMGD1MMEha9gOQD5o42vt0a-MsEWBWvhzcenJTGqGxrJPWOoDXhoZbj0lFtl_xzq_dTL9owKE-hlkHtb',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 3,
    category: 'PEOPLE',
    title: 'Heritage',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5hlHU7-707y3V_DfnxU-yRfjcBIVolMUTHaWnKi81kDdE8k7ch3m3Q2BiUQOTu0s_jU5Ua-vftkP7YAxjMeIbWCwoj27hQEGeM3FWxKUhsrBzZkZWXllhPvUqZw6j-j5euf2F15B0KPSqJlTwbIW5CKz9fj1SRQCq_bgTl84z96sVBAwIHjREL1wRhaqgCFh1GmCoJyzCPU4agYx8ko11ePXlLAvAH8SEzJDKS7Vf9Lx-2ZadXeDsoDdM_HiCyAwCfFmKMC6r_x6K',
    aspect: 'aspect-[2/3]'
  },
  {
    id: 4,
    category: 'TRAVEL',
    title: 'Urban Pulse',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPamYD_J44l5XXNglJv8ck8zFAwiN1gBu7RzB5rUJFj6K5Ph8y3u-0GsVOi3cyqPl8NtiSmC3hSaYW15MSvmU7UWlvMuc-9bzLINXxcs8p6isVtjvOez6J2MkrXcsTObMozg2LTCLRtJZNLueTqJw2yEaR__NTtgq1afVZ9G3vmZTyDqnNLykYtjhmgzRRfYskaIYCHHbBHKtthyUWBrXFAjlHdsESie0bNP_ZF3o78wbY1ZlRBeMhc6BG2DAaThFoZHSh0fBvrNa2',
    aspect: 'aspect-square'
  },
  {
    id: 5,
    category: 'EVENTS',
    title: 'Gala Night',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYR7mBHOHAqZFYHBhliCVJ-c5gWuJs1DIeklLlspzV-CiXSA8exo8cmR9tBT1KP3IY7h8yGw7nuaE6XfLhlc16wDyNogtaiMBxFt6EnHLe5znc3bF1BQblQEs0DHoulwTZW6F2OIz8rWmZWGAYeenG_fg_Eu5gpkgOoeqdGFYLqSfLnsTJidrr4K3XvJTeMkDIK6yiKUX7XTSQu24ZIGKC2YN7fk8AWWLXoXgjqa7nd22yw9xJ_Xovfwtct79Q_jT-WKq1Nd1vxKQQ',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 6,
    category: 'PLACES',
    title: 'Serengeti Dawn',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSP_rUA0g_m48HWUmqPtCTle1r8rcoZltQnOTTCCfv-Gr8e2ALjEPYwqRzf293XRh1y9zsDMMTj2TDamTWSnPc6JcFe70cpgaf3oBoiEnfCFAcfAe4uiB97JCasl5Mp19X_m4DPgbQXR5UiOQwH4Ct-FuJNGg5C-1yAQ2GV1w2CDu0WgUSOJuuUY2APynYNIpTcIl_X1pzbZM6knnPduCwT4aMPMCe3V1f6NoUV9Ij8-gv15DkkK2jkDoFClz8MBTE_Jjq9WBKKYdV',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 7,
    category: 'EVENTS',
    title: 'Rhythm & Soul',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMyrynNOigAxy_CkWPiux9DL1AZbRer2DWvYcMHo4dgkjNCX34HERLbCHAA_Rab6rqaB15f3IwNArTjTT1IKFDLi8WRN1HrUUrlSBjUV_tR1gXV8iLmJIEUmRXxaZMOQs7o8idtiaCeRdhIalv7Q6NK5XlCCVDNxRBrmpZwTs7ZaW8O1ylEMA73mrPH-ZieIYuLCF10ECHafrCFW8rS3hmPf9rYLQSieDifOJszo3AIfwDkUVi6cr62teLaGKQ8xlPtBWDXSbDuYHS',
    aspect: 'aspect-[3/5]'
  },
   {
    id: 8,
    category: 'TRAVEL',
    title: 'Market Finds',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5GDJw_2H1IkWU-SNl2fwa1XtUx6810jjb6eh1F-mN-z-9e5THhWQIE8S-bMSr--UoyaiyRVK8J4mJ7HuweJvNENjRNb5m4OL6emsxaPvUS3XE1zEwZzLnJVL21oTd2GfY36ZOqw3jGxUH9crPQ3_B1Z6pwXZIi4Z7xKsf6LWR3lxW7pyfA9KOS3gWxuvLVHN6fxSplBBRQ4sUlCOKqB_MbY-COjYfAmLj-hD-C0dDZNWQ_H6dmGIslgNVCY9b_e83T2TO8fFs_fyK',
    aspect: 'aspect-square'
  },
   {
    id: 9,
    category: 'PEOPLE',
    title: 'Golden Hour',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHJJO5lhh8fW_f8x49_nRtM_nCBY8Gcd4Tq6LubT8KnCEyiIUEN8pVN31qHnVHGWeR1VyfH5WGY8bUsALhTcKSU_3o7Zbm-2xnXcAa3GKl4Gcopo8jf33vQVqW1T3HPH5kjBVTWlEOCoxyRenCDD-Zk79GQ_Di-pcOpceamkkbqdoNqHtD_OsS8G53IBwJnM7Ee-X-5SgHvUBKjAcwPh8SxkFISE22i5PPMkFI-YX9tw1IQzPOOWiXcBb-qVmbdKo6QwNZi-nSddi5',
    aspect: 'aspect-[4/5]'
  },
];

const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');

  const filteredWorks = activeCategory === 'ALL' 
    ? works 
    : works.filter(work => work.category === activeCategory);

  return (
    <section className="py-20 px-6 md:px-12 w-full max-w-[1600px] mx-auto bg-cream">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="font-display font-bold text-4xl md:text-6xl text-primary mb-4">Selected Works</h2>
        <p className="text-primary/70 max-w-lg mb-8 font-light">
          A curated collection of moments captured across the vibrant landscapes and soulful expressions of Kenya.
        </p>

        {/* Filter */}
        <div className="inline-flex flex-wrap justify-center gap-3 p-2 bg-white rounded-full shadow-sm border border-primary/5">
          {(['ALL', 'PEOPLE', 'PLACES', 'EVENTS', 'TRAVEL'] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300
                ${activeCategory === cat 
                  ? 'bg-primary text-white shadow-md transform scale-105' 
                  : 'text-primary/60 hover:text-primary hover:bg-primary/5'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid pb-12">
        {filteredWorks.map((work) => (
          <div key={work.id} className="break-inside-avoid mb-6 group relative overflow-hidden rounded-xl cursor-pointer">
            <div className={`relative w-full ${work.aspect} overflow-hidden rounded-xl bg-gray-200`}>
              <img 
                src={work.src} 
                alt={work.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-gold text-xs font-bold tracking-widest uppercase mb-1">{work.category}</span>
                <h3 className="text-white font-display font-bold text-2xl">{work.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
         <button className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm hover:text-gold transition-colors group">
            View More Projects
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
         </button>
      </div>
    </section>
  );
};

export default GallerySection;