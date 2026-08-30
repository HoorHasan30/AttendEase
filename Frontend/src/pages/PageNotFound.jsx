import React, { useEffect } from 'react'
import { Link } from 'react-router'

function PageNotFound() {

  useEffect(() => {
    document.title = "Page Not Found"
    
    if (!document.querySelector('script[src*="lottie-player"]')) {
      const script = document.createElement('script')
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <section className="d-flex align-items-center min-vh-100 py-5">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_kcsr6fcp.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
          <div className="col-md-6 text-center text-md-start">
            <div className="mb-3">
              <h1 className="display-1 fw-bold text-muted">Error 404</h1>
            </div>
            <div className="mb-5">
              <p className="rfs-11 fw-light">
                The page you are looking for was moved, removed or might never have existed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageNotFound