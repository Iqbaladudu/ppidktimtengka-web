'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTheme } from 'next-themes'

gsap.registerPlugin(useGSAP)

export const CairoSkyline = React.memo(function CairoSkyline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useGSAP(
    () => {
      if (!wrapperRef.current) return

      const paths = gsap.utils.toArray<SVGPathElement>('.cairo-skyline-svg path')

      // Infinite Scroll Animation (Walking Effect)
      // We animate the wrapper containing two identical SVGs
      const totalWidth = wrapperRef.current.scrollWidth / 2 // Approximate width of one SVG set

      // Infinite horizontal loop (Left to Right)
      gsap.to(wrapperRef.current, {
        xPlaceholder: '0%', // Just to comment: starting from -50% to 0% creates L->R
        xPercent: 50, // Move from current (0 or -50) to +50? No.
        // Logic:
        // We have 2 SVGs side by side: [SVG1][SVG2] inside wrapper.
        // To move L->R (objects move right), we can animate wrapper x from -50% to 0%.
        // Wait, if we want "walking from left to right", the scenery usually moves R->L (camera moves right).
        // But user said "berjalan dari kiri ke kanan" (walking from L to R).
        // If the object walks L->R, the position x increases.
        // Let's assume the user wants the skyline to drift from L->R.
        // Initial state: Wrapper at x: -50%. (showing SVG2 mostly or half-half).
        // Animate to x: 0%. The whole strip moves right.
        // When it hits 0%, snap back to -50%.

        // Let's set initial xPercent to -50 in CSS or .set
        startAt: { xPercent: -50 },
        xPercent: 0,
        duration: 30, // Low speed for "walking"
        ease: 'none',
        repeat: -1,
      })

      // Only run visual effects (Twinkle/Scan) in dark mode
      if (resolvedTheme === 'dark') {
        if (paths.length > 0) {
          // 1. Twinkle Effect (Random Opacity Pulse)
          const twinklePaths = gsap.utils
            .shuffle([...paths])
            .slice(0, Math.ceil(paths.length * 0.4))

          twinklePaths.forEach((path) => {
            gsap.to(path, {
              opacity: 0.3,
              duration: gsap.utils.random(1, 2.5),
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: gsap.utils.random(0, 3),
            })
          })
        }

        // 2. Scanning Light Effect
        const scanLines = containerRef.current?.querySelectorAll(
          '.scan-line',
        ) as NodeListOf<SVGPathElement>
        if (scanLines.length > 0) {
          scanLines.forEach((scanLine) => {
            const length = scanLine.getTotalLength()
            gsap.set(scanLine, {
              strokeDasharray: `${length * 0.1} ${length * 0.9}`,
              strokeDashoffset: length,
            })

            gsap.to(scanLine, {
              strokeDashoffset: -length,
              duration: 6,
              repeat: -1,
              ease: 'none',
            })
          })
        }
      } else {
        // Reset props if not dark mode
        gsap.killTweensOf(paths)
        gsap.set(paths, { clearProps: 'opacity' })
      }
    },
    { scope: containerRef, dependencies: [resolvedTheme] },
  )

  // Single SVG content component to reuse
  const SVGContent = ({ idPrefix }: { idPrefix: string }) => (
    <div className="relative flex-none w-[200vw] sm:w-[150vw] md:w-screen h-full flex items-end">
      <svg
        viewBox="0 0 262.92838 106.71335"
        xmlns="http://www.w3.org/2000/svg"
        className="cairo-skyline-svg w-full h-full opacity-25 dark:opacity-50 fill-primary"
        preserveAspectRatio="xMidYMax meet" // Keep aspect ratio, align bottom
      >
        <g transform="translate(-29.372003,-425.87887)">
          <g transform="translate(2.0324027,1.0162014)">
            {/* Path data unchanged, just copied from original */}
            <path d="m 119.90053,444.84134 h 12.9292 v 61.2972 h -12.9292 v -61.2972" />
            <path d="m 121.91306,444.84134 h 8.90414 v -2.444 h -8.90414 v 2.444" />
            <path d="m 123.46826,442.82 h 5.79374 v -3.29066 h -5.79374 V 442.82" />
            <path d="m 126.1364,439.52934 h 0.45733 V 425.028 h -0.45733 v 14.50134" />
            <path d="m 118.82453,454.90134 c 0,0.41466 3.8124,0.752 7.54053,0.752 3.72814,0 7.54027,-0.33734 7.54027,-0.752 0,-0.416 -3.81213,-0.752 -7.54027,-0.752 -3.72813,0 -7.54053,0.336 -7.54053,0.752" />
            <path d="m 118.82453,445.02934 c 0,0.41466 3.8124,0.752 7.54053,0.752 3.72814,0 7.54027,-0.33734 7.54027,-0.752 0,-0.416 -3.81213,-0.752 -7.54027,-0.752 -3.72813,0 -7.54053,0.336 -7.54053,0.752" />
            <path d="m 125.938,424.98 c 0,0.0653 0.18493,0.11867 0.412,0.11867 0.22706,0 0.41146,-0.0533 0.41146,-0.11867 0,-0.064 -0.1844,-0.11733 -0.41146,-0.11733 -0.22707,0 -0.412,0.0533 -0.412,0.11733" />
            <path d="m 59.519332,477.94534 -9.728133,-1.024 -10.41,1.024 v 25.51453 h 20.138133 v -25.51453" />
            <path d="m 56.959332,474.87347 -7.254667,-1.024 -7.763466,1.024 V 500.388 h 15.018133 v -25.51453" />
            <path d="m 58.836932,474.87347 -9.3864,-1.536 -9.386533,1.536 9.386533,2.38907 9.3864,-2.38907" />
            <path d="m 54.911465,472.3136 -5.276,-1.024 -5.646399,1.024 v 25.51454 H 54.911465 V 472.3136" />
            <path d="m 265.96933,485.56827 24.29866,23.13333 h -48.59866 l 24.3,-23.13333" />
            <path d="M 235.27199,466.66534 191.12,508.7016 h 50.55066 l 18.20933,-18.60946 -24.608,-23.4268" />
            <path d="M 207.49599,477.20787 174.416,508.7016 h 16.704 l 24.23866,-24.0084 -7.86267,-7.48533" />
            <path d="m 184.89466,473.524 h -1.72533 V 463.29734 H 182.368 c -0.44,-1.38134 -1.71867,-2.38934 -3.24667,-2.38934 -1.52667,0 -2.80533,1.008 -3.24533,2.38934 h -0.80134 v 4.12666 h -1.904 v -4.12666 h -0.8 c -0.44,-1.38134 -1.71866,-2.38934 -3.24666,-2.38934 -1.528,0 -2.80667,1.008 -3.24534,2.38934 h -0.80133 v 1.62666 c -1.528,0 -2.80667,1.008 -3.24667,2.39054 h -0.8 v 16.35626 h -1.904 v -16.89213 h -0.80133 c -0.44,-1.38133 -1.71867,-2.38933 -3.24667,-2.38933 -1.52666,0 -2.80533,1.008 -3.24533,2.38933 H 151.032 v 40.72653 h 33.86266 V 473.524" />
            <path d="M 27.340133,508.7016 H 224.89746 v -6.85104 H 27.340133 Z" />
            <path d="m 146.48133,480.5068 -2.44267,-4.4708 -2.44266,4.4708 v 24.03334 h 4.90933 V 480.5068 h -0.024" />
            <path d="m 140.95333,480.5932 c 0,0.1896 1.37333,0.3428 3.068,0.3428 1.69467,0 3.068,-0.1532 3.068,-0.3428 0,-0.18906 -1.37333,-0.34373 -3.068,-0.34373 -1.69467,0 -3.068,0.15467 -3.068,0.34373" />
            <path d="m 140.95333,484.16147 c 0,0.18907 1.37333,0.34267 3.068,0.34267 1.69467,0 3.068,-0.1536 3.068,-0.34267 0,-0.19067 -1.37333,-0.34427 -3.068,-0.34427 -1.69467,0 -3.068,0.1536 -3.068,0.34427" />
            <path d="m 83.122398,483.31614 -1.302667,-5.39894 -1.302533,5.39894 v 23.04533 h 2.618267 v -23.04533 h -0.01307" />
            <path d="m 80.174531,483.4188 c 0,0.22907 0.732267,0.41454 1.6364,0.41454 0.9036,0 1.6364,-0.18547 1.6364,-0.41454 0,-0.22813 -0.7328,-0.4136 -1.6364,-0.4136 -0.904133,0 -1.6364,0.18547 -1.6364,0.4136" />
            <path d="m 80.174531,487.72814 c 0,0.22813 0.732267,0.41306 1.6364,0.41306 0.9036,0 1.6364,-0.18493 1.6364,-0.41306 0,-0.22974 -0.7328,-0.41454 -1.6364,-0.41454 -0.904133,0 -1.6364,0.1848 -1.6364,0.41454" />
            <path d="m 64.413598,483.31614 -1.302666,-5.39894 -1.302534,5.39894 v 23.04533 h 2.618134 v -23.04533 h -0.01293" />
            <path d="m 61.465598,483.4188 c 0,0.22907 0.7328,0.41454 1.636534,0.41454 0.9036,0 1.6364,-0.18547 1.6364,-0.41454 0,-0.22813 -0.7328,-0.4136 -1.6364,-0.4136 -0.903734,0 -1.636534,0.18547 -1.636534,0.4136" />
            <path d="m 61.465598,487.72814 c 0,0.22813 0.7328,0.41306 1.636534,0.41306 0.9036,0 1.6364,-0.18493 1.6364,-0.41306 0,-0.22974 -0.7328,-0.41454 -1.6364,-0.41454 -0.903734,0 -1.636534,0.1848 -1.636534,0.41454" />
            <path d="m 61.465598,505.73747 h 39.858932 v -12.1296 H 61.465598 v 12.1296" />
            <path d="m 103.59693,505.73747 h 29.2744 v -12.1296 h -29.2744 v 12.1296" />
            <path d="m 134.85466,505.73747 h 34.05467 v -8.94267 h -34.05467 v 8.94267" />
            <path d="M 87.133864,495.31974 H 98.882798 V 483.19067 H 87.133864 v 12.12907" />
            <path d="m 103.59693,507.36827 h 10.13067 v -34.9032 c -5.59534,0 -10.13067,4.53493 -10.13067,10.12973 v 24.77347" />
            <path d="m 66.108398,498.8412 h 12.214533 v -10.7 H 66.108398 v 10.7" />
            <path d="m 27.340133,505.0224 h 9.990533 V 494.324 l -9.990533,-8.49746 v 19.19586" />
            <path d="m 112.10573,473.33747 h 0.79733 l -0.3984,-11.1028 z" />
            <path d="m 88.517198,487.71454 h 0.797333 l -0.3984,-9.61867 z" />
            <path d="m 92.098398,483.46827 h 0.798 l -0.399067,-11.1032 z" />
            <path d="m 112.50466,476.03494 h 1.67867 V 475.036 h -1.67867 v 0.99894" />
            <path d="m 112.50466,477.75467 h 1.67867 v -0.99893 h -1.67867 v 0.99893" />
            <path d="m 112.50466,479.47454 h 1.67867 V 478.476 h -1.67867 v 0.99854" />
            <path d="m 112.50466,481.1948 h 1.67867 v -0.99893 h -1.67867 v 0.99893" />
            <path d="m 112.50466,482.91454 h 1.67867 v -0.9984 h -1.67867 v 0.9984" />
            <path d="m 112.50466,484.63494 h 1.67867 V 483.636 h -1.67867 v 0.99894" />
            <path d="m 112.50466,486.35574 h 1.67867 v -1 h -1.67867 v 1" />
            <path d="m 112.50466,488.07454 h 1.67867 V 487.076 h -1.67867 v 0.99854" />
            <path d="m 112.50466,489.79587 h 1.67867 v -0.99853 h -1.67867 v 0.99853" />
            <path d="m 112.50466,491.51614 h 1.67867 v -0.99894 h -1.67867 v 0.99894" />
            <path d="m 112.50466,493.236 h 1.67867 v -0.99853 h -1.67867 v 0.99853" />
            <path d="m 112.50466,474.336 h 1.67867 v -0.99853 h -1.67867 v 0.99853" />
          </g>
        </g>
      </svg>

      {/* Scanning Light Overlay */}
      <svg
        viewBox="0 0 262.92838 106.71335"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 right-0 w-full h-full hidden dark:block pointer-events-none"
        preserveAspectRatio="xMidYMax meet"
      >
        <g transform="translate(-29.372003,-425.87887)">
          <path
            className="scan-line"
            d="M 27.340133,508.7016 H 224.89746"
            transform="translate(2.0324027,1.0162014)"
            fill="none"
            stroke={`url(#scanGradient-${idPrefix})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <linearGradient id={`scanGradient-${idPrefix}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="absolute -bottom-15 lg:-bottom-47 left-0 right-0 z-0 h-[60vh] sm:h-[60vh] md:h-[70vh] lg:h-auto pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div ref={wrapperRef} className="flex w-fit h-full">
        {/* Render two copies for seamless loop */}
        <SVGContent idPrefix="1" />
        <SVGContent idPrefix="2" />
      </div>
    </div>
  )
})

CairoSkyline.displayName = 'CairoSkyline'
