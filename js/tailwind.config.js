tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#113827', // New Deep Green
                    gold: '#D4AF37', // Gold
                    bone: '#F9F9F7', // New Off-White
                    gray: '#E5E5E5',
                    active: '#D4AF37'
                },
                // Aliases for compatibility with existing HTML
                primary: '#113827',
                gold: '#D4AF37',
                cream: '#F9F9F7',
                whatsapp: '#25D366'
            },
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['Inter', 'sans-serif']
            },
            borderRadius: { DEFAULT: '2px', 'sm': '2px', 'md': '4px', 'lg': '6px', 'full': '9999px' }
        }
    }
}
