import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {

    const videoRef = useRef(null);

    useEffect(() => {

        const tl = gsap.timeline();

        tl.from(".hero-title", {
            y: 120,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        })

            .from(".hero-description", {
                y: 40,
                opacity: 0,
                duration: .8
            }, "-=0.7")

            .from(".scroll-indicator", {
                opacity: 0,
                y: 20,
                duration: .8
            }, "-=0.4");

        const moveBackground = (e) => {

            const x =
                (e.clientX / window.innerWidth - 0.5) * 20;

            const y =
                (e.clientY / window.innerHeight - 0.5) * 20;

            gsap.to(videoRef.current, {
                x,
                y,
                duration: 1.5,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", moveBackground);

        return () => {
            window.removeEventListener("mousemove", moveBackground);
        };

    }, []);

    return (
        <>
            <style>{`

                *{
                    box-sizing:border-box;
                    margin:0;
                    padding:0;
                }

                .hero{
                    position:relative;
                    height:100vh;
                    width:100%;
                    overflow:hidden;
                    background:#050505;
                }

                .hero-video{
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
    object-fit:cover;
    z-index:1;

    transform:scale(1.08);

    will-change:transform;
}

                .hero-overlay{
    position:absolute;
    inset:0;
    z-index:2;

    background:
        radial-gradient(
            circle at center,
            rgba(37,99,235,.12),
            transparent 55%
        ),
        linear-gradient(
            to bottom,
            rgba(0,0,0,.15),
            rgba(0,0,0,.45)
        );
}

                .hero-content{
    position:relative;
    z-index:3;

    height:100%;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;

    width:100%;
    max-width:700px;
    padding-top:120px;
    padding-left:8%;
    padding-right:8%;
    padding-bottom:60px;

    text-align:left;
}

                .hero-tag{
                    color:#60A5FA;
                    font-size:14px;
                    font-weight:600;
                    letter-spacing:4px;
                    margin-bottom:25px;
                    text-transform:uppercase;
                    text-align:left;
                }

               .hero-title{

    color:white;

    font-size:clamp(4rem,7vw,7rem);

    font-weight:700;

    line-height:.88;

    letter-spacing:-5px;

    max-width:700px;

    margin-bottom:10px;

    text-align:left;
}

.hero-highlight{

    background:
        linear-gradient(
            90deg,
            #2563EB,
            #60A5FA
        );

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;

    background-clip:text;

    display:inline-block;

    filter:
        drop-shadow(
            0 0 20px rgba(37,99,235,.45)
        );
}

.hero-script{

    font-family:"Brush Script MT", cursive;

    font-size:.55em;

    font-weight:400;

    color:white;

    margin-left:20px;

    position:relative;

    top:-18px;

    transform:rotate(-8deg);

    display:inline-block;
}

.hero-line {

    width: 70px;

    height: 4px;

    background: #2563EB;

    margin: 25px 0 35px;
}

                .hero-description{

    max-width:650px;

    color:rgba(255,255,255,.82);

    font-size:1.15rem;

    font-weight:400;

    line-height:1.8;

    letter-spacing:-0.2px;

    margin-top:10px;

    opacity:.9;

    animation:fadeUp 1s ease forwards;
    color:rgba(255,255,255,.82);
font-weight:400;
}
                .hero-actions{

    display:flex;

    gap:20px;

    margin-top:35px;

    justify-content:flex-start;

    width:auto;
}

                .btn-primary{
                    padding:18px 34px;

                    border:none;
                    border-radius:50px;

                    background:#2563EB;
                    color:white;

                    font-size:1rem;
                    font-weight:600;

                    cursor:pointer;

                    transition:.3s;
                }

                .btn-primary:hover{
                    transform:translateY(-3px);
                    background:#1D4ED8;
                }

                .btn-secondary{
                    padding:18px 34px;

                    border-radius:50px;

                    border:1px solid rgba(255,255,255,.25);

                    background:rgba(255,255,255,.05);

                    backdrop-filter:blur(10px);

                    color:white;

                    font-size:1rem;
                    font-weight:600;

                    cursor:pointer;

                    transition:.3s;
                }

                .btn-secondary:hover{
                    background:rgba(255,255,255,.12);
                    transform:translateY(-3px);
                }

                .scroll-indicator{

    position:absolute;

    left:50%;
    bottom:35px;

    transform:translateX(-50%);

    color:white;

    font-size:2rem;

    z-index:5;

    text-shadow:
        0 0 15px rgba(255,255,255,.4),
        0 0 25px rgba(37,99,235,.5);

    animation:floatArrow 2s infinite;
}

                @keyframes floatArrow{

                    0%,100%{
                        transform:
                            translateX(-50%)
                            translateY(0);
                    }

                    50%{
                        transform:
                            translateX(-50%)
                            translateY(12px);
                    }
                }

                /* =========================
   TABLET
========================= */

@media (max-width: 992px){

    .hero-content{

        max-width:600px;

        padding:140px 40px 60px;
    }

    .hero-title{

        font-size:clamp(3.5rem,8vw,5rem);

        line-height:.9;

        letter-spacing:-3px;
    }

    .hero-description{

        max-width:520px;

        font-size:1rem;

        line-height:1.7;
    }

    .hero-script{

        font-size:.5em;

        top:-10px;

        margin-left:10px;
    }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px){

    .hero{

        min-height:100vh;
        height:auto;
    }

    .hero-content{

        align-items:center;

        text-align:center;

        max-width:100%;

        padding:120px 24px 80px;
    }

    .hero-title{

        font-size:3.2rem;

        line-height:.95;

        letter-spacing:-2px;

        text-align:center;
    }

    .hero-description{

        max-width:100%;

        text-align:center;

        font-size:1rem;

        line-height:1.7;

        margin-top:20px;
    }

    .hero-script{

        display:block;

        margin:0;

        top:0;

        transform:none;

        font-size:.45em;
    }

    .hero-line{

        margin:20px auto 25px;
    }

    .hero-actions{

        width:100%;

        justify-content:center;

        flex-wrap:wrap;
    }

    .scroll-indicator{

        bottom:20px;

        font-size:1.6rem;
    }
}

/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 480px){

    .hero-content{

        padding:110px 20px 70px;
    }

    .hero-title{

        font-size:2.6rem;

        line-height:1;
    }

    .hero-description{

        font-size:.95rem;

        line-height:1.65;
    }

    .hero-script{

        font-size:.42em;
    }

    .scroll-indicator{

        font-size:1.4rem;
    }
}


            `}</style>

            <section className="hero">

                {/* VIDEO */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video"
                >
                    <source
                        src="/videos/background5.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* OVERLAY */}
                <div className="hero-overlay"></div>

                {/* CONTENT */}
                <div className="hero-content">

                    {/*<p className="hero-tag">*/}
                    {/*    PH SOLUTIONS*/}
                    {/*</p>*/}

                    <h1 className="hero-title">

                        Transforming

                        <br />

                        <span className="hero-highlight">
                            Learners
                        </span>

                        <span className="hero-script">
                            Into
                        </span>

                        <br />

                        Industry

                        <br />

                        Professionals

                    </h1>

                    {/*<h1 className="hero-title">*/}

                    {/*    Build Skills*/}

                    {/*    <br />*/}

                    {/*    <span className="hero-highlight">*/}
                    {/*        Gain Experience*/}
                    {/*    </span>*/}

                    {/*    <br />*/}

                    {/*    Launch Your*/}

                    {/*    <br />*/}

                    {/*    Career*/}

                    {/*</h1>*/}

                   {/* <div className="hero-line"></div>*/}



                    <p className="hero-description">
                        <strong>Build skills.</strong> Gain experience.
                        Launch your career through industry-led training,
                        live projects, mentorship, and modern technology programs.
                    </p>

                    {/*<div className="hero-actions">*/}

                    {/*    <button className="btn-primary">*/}
                    {/*        Explore Programs*/}
                    {/*    </button>*/}

                    {/*    <button className="btn-secondary">*/}
                    {/*        Book Consultation*/}
                    {/*    </button>*/}

                    {/*</div>*/}

                </div>

                {/* SCROLL ICON */}
                <div className="scroll-indicator">
                    ↓
                </div>

            </section>
        </>
    );
}

export default Hero;