/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ─── Palette extracted from background-video1.mp4 ────────────────
      // Video shows: electric neon green object on deep black with cyan inner glow
      colors: {
        // ── Primary: Electric neon green (the glowing rim of the video object)
        'primary':                '#39ff6a',
        'primary-dim':            '#2ddd58',
        'primary-fixed':          '#1fff5a',
        'primary-fixed-dim':      '#15e64d',
        'primary-container':      '#1fff5a',
        'on-primary':             '#001a0d',
        'on-primary-fixed':       '#000000',
        'on-primary-fixed-variant': '#001a0d',
        'on-primary-container':   '#001208',
        'inverse-primary':        '#00a032',
        'surface-tint':           '#39ff6a',

        // ── Secondary: Cyan-teal (the inner glow / liquid core of the object)
        'secondary':              '#00e5cc',
        'secondary-dim':          '#00ccb8',
        'secondary-fixed':        '#00e5cc',
        'secondary-fixed-dim':    '#00ccb8',
        'secondary-container':    '#004d44',
        'on-secondary':           '#003d38',
        'on-secondary-container': '#ccfff9',
        'on-secondary-fixed':     '#001a16',
        'on-secondary-fixed-variant': '#00332d',

        // ── Tertiary: Keep warm pink for contrast (badge accents)
        'tertiary':               '#ff6a9f',
        'tertiary-dim':           '#ff6a9f',
        'tertiary-fixed':         '#ff8eb2',
        'tertiary-fixed-dim':     '#ff75a5',
        'tertiary-container':     '#f3438b',
        'on-tertiary':            '#470021',
        'on-tertiary-container':  '#000000',
        'on-tertiary-fixed':      '#380018',
        'on-tertiary-fixed-variant': '#76003a',

        // ── Surfaces: Near-black with dark forest green tint (ambient from video)
        'background':             '#070e08',
        'surface':                '#070e08',
        'surface-dim':            '#040905',
        'surface-bright':         '#192b1a',
        'surface-variant':        '#182818',
        'surface-container':      '#0f1a10',
        'surface-container-low':  '#0a140c',
        'surface-container-high': '#131f15',
        'surface-container-highest': '#182818',
        'surface-container-lowest':  '#000000',

        // ── On-surface: Slightly green-tinted off-white
        'on-background':          '#e8ffe8',
        'on-surface':             '#e8ffe8',
        'on-surface-variant':     '#8dba8d',
        'inverse-surface':        '#e8ffe8',
        'inverse-on-surface':     '#182818',

        'outline':                '#547054',
        'outline-variant':        '#2a4a2a',

        'error':                  '#ff6e84',
        'error-dim':              '#d73357',
        'error-container':        '#a70138',
        'on-error':               '#490013',
        'on-error-container':     '#ffb2b9',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg:      '0.5rem',
        xl:      '0.75rem',
        '2xl':   '1rem',
        '3xl':   '1.5rem',
        full:    '9999px',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body:     ['Inter', 'sans-serif'],
        label:    ['Inter', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'slide-in': {
          '0%':   { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in':  'fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in': 'slide-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
