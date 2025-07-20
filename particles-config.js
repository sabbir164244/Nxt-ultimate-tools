const particlesConfig = {
    background: {
        color: {
            value: "transparent"
        }
    },
    fpsLimit: 60,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse"
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: "#a78bfa"
        },
        links: {
            color: "#6366f1",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce"
            },
            random: false,
            speed: 1,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.3
        },
        shape: {
            type: "circle"
        },
        size: {
            value: {
                min: 1,
                max: 5
            }
        }
    },
    detectRetina: true
};

export default particlesConfig;
