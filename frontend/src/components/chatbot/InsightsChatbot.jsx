import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function InsightsChatbot() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/assistant')
  }

  // Animation variants for the idle movement
  const robotVariants = {
    idle: {
      y: [0, -10, 0],
      rotate: [0, -2, 2, 0],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  }

  // Head tilt to simulate looking around
  const headVariants = {
    idle: {
      rotate: [0, 5, 0, -5, 0],
      x: [0, 4, 0, -4, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.7, 1]
      }
    }
  }

  return (
    <>
      <div className="chatbot-wrapper">
        {/* 3D Robot Mascot */}
        <motion.div 
          className="robot-container"
          variants={robotVariants}
          animate="idle"
          onClick={handleClick}
          whileHover={{ scale: 0.85 }} /* scaled from original 1.05 considering base scale 0.8 */
          whileTap={{ scale: 0.75 }}
        >
          {/* Shadow underneath */}
          <div className="robot-shadow" />

          {/* Antennas */}
          <div className="antenna left">
            <div className="antenna-bulb" />
          </div>
          <div className="antenna right">
            <div className="antenna-bulb" />
          </div>

          {/* Head */}
          <motion.div className="robot-head" variants={headVariants} animate="idle">
            {/* Ears */}
            <div className="robot-ear left" />
            <div className="robot-ear right" />
            
            {/* Screen / Face */}
            <div className="robot-face-screen">
              <div className="robot-eye left">
                <div className="eye-glow" />
              </div>
              <div className="robot-eye right">
                <div className="eye-glow" />
              </div>
              <div className="robot-mouth" />
            </div>
          </motion.div>

          {/* Body */}
          <div className="robot-body">
            <div className="body-collar" />
            <div className="body-chest">
              <div className="chest-light" />
            </div>
            
            {/* Arms */}
            <div className="robot-arm left">
              <div className="robot-hand" />
            </div>
            <div className="robot-arm right">
              <div className="robot-hand" />
            </div>

            {/* Legs */}
            <div className="robot-leg left" />
            <div className="robot-leg right" />
          </div>
        </motion.div>
      </div>

      <style>{`
        .chatbot-wrapper {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }

        /* ── 3D ROBOT MASCOT ── */
        .robot-container {
          position: relative;
          width: 140px;
          height: 180px;
          cursor: pointer;
          perspective: 1000px;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* Making the chatbot smaller */
          transform: scale(0.8);
          transform-origin: bottom right;
        }

        .robot-shadow {
          position: absolute;
          bottom: -15px;
          width: 80px;
          height: 20px;
          background: rgba(0,0,0,0.5);
          border-radius: 50%;
          filter: blur(8px);
          z-index: 0;
        }

        /* Antennas */
        .antenna {
          position: absolute;
          top: -12px;
          width: 6px;
          height: 25px;
          background: linear-gradient(to right, #ccc, #fff, #999);
          z-index: 1;
          border-radius: 3px;
        }
        .antenna.left { left: 40px; transform: rotate(-10deg); }
        .antenna.right { right: 40px; transform: rotate(10deg); }
        
        .antenna-bulb {
          position: absolute;
          top: -8px;
          left: -3px;
          width: 12px;
          height: 12px;
          background: #00eeff;
          border-radius: 50%;
          box-shadow: 0 0 10px #00eeff, inset 2px 2px 5px rgba(255,255,255,0.8);
        }

        /* Head */
        .robot-head {
          position: relative;
          width: 120px;
          height: 90px;
          background: radial-gradient(circle at 30% 30%, #ffffff, #e0e6ed 60%, #b8c4d1);
          border-radius: 40px;
          box-shadow: 
            inset -5px -5px 15px rgba(0,0,0,0.1),
            inset 5px 5px 15px rgba(255,255,255,0.9),
            0 10px 20px rgba(0,0,0,0.3);
          z-index: 3;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Ears */
        .robot-ear {
          position: absolute;
          top: 30px;
          width: 15px;
          height: 30px;
          background: linear-gradient(to right, #a0aec0, #cbd5e1);
          border-radius: 8px;
          box-shadow: inset 1px 1px 3px rgba(255,255,255,0.5), inset -1px -1px 5px rgba(0,0,0,0.3);
        }
        .robot-ear.left { left: -10px; }
        .robot-ear.right { right: -10px; }

        /* Face Screen */
        .robot-face-screen {
          width: 100px;
          height: 60px;
          background: #0a0f18;
          border-radius: 25px;
          border: 2px solid #fff;
          box-shadow: 
            inset 0 0 20px rgba(0, 238, 255, 0.4),
            0 0 15px rgba(0, 238, 255, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          position: relative;
          overflow: hidden;
        }
        
        /* Glass reflection on screen */
        .robot-face-screen::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 50%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.15), transparent);
          border-radius: 25px 25px 0 0;
          pointer-events: none;
        }

        /* Eyes */
        .robot-eye {
          width: 30px;
          height: 30px;
          background: #000;
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 10px rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .eye-glow {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #ff00ff;
          border-right-color: #00eeff;
          transform: rotate(45deg);
          box-shadow: 0 0 8px #ff00ff, inset 0 0 8px #00eeff;
        }
        
        /* Cute mouth */
        .robot-mouth {
          position: absolute;
          bottom: 12px;
          width: 10px;
          height: 5px;
          border-bottom: 2px solid rgba(0, 238, 255, 0.8);
          border-radius: 50%;
        }

        /* Body */
        .robot-body {
          position: relative;
          width: 90px;
          height: 70px;
          background: radial-gradient(circle at 30% 30%, #ffffff, #e0e6ed 70%, #94a3b8);
          border-radius: 35px 35px 25px 25px;
          margin-top: -10px;
          z-index: 2;
          box-shadow: 
            inset -5px -10px 15px rgba(0,0,0,0.15),
            inset 5px 5px 15px rgba(255,255,255,0.9),
            0 10px 15px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .body-collar {
          width: 50px;
          height: 15px;
          background: linear-gradient(to bottom, #8a2be2, #00eeff);
          border-radius: 10px;
          margin-top: 5px;
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.6);
        }

        .body-chest {
          margin-top: 10px;
          width: 40px;
          height: 12px;
          background: rgba(0,0,0,0.1);
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: inset 1px 1px 3px rgba(0,0,0,0.2);
        }

        .chest-light {
          width: 20px;
          height: 4px;
          background: #00eeff;
          border-radius: 2px;
          box-shadow: 0 0 8px #00eeff;
          animation: pulse-light 2s infinite alternate;
        }

        @keyframes pulse-light {
          0% { opacity: 0.5; box-shadow: 0 0 4px #00eeff; }
          100% { opacity: 1; box-shadow: 0 0 12px #00eeff; }
        }

        /* Arms */
        .robot-arm {
          position: absolute;
          top: 15px;
          width: 25px;
          height: 40px;
          background: linear-gradient(135deg, #ffffff, #cbd5e1);
          border-radius: 15px;
          box-shadow: inset -2px -2px 5px rgba(0,0,0,0.1), 2px 2px 5px rgba(0,0,0,0.2);
        }
        .robot-arm.left { 
          left: -15px; 
          transform-origin: top right;
          transform: rotate(20deg);
        }
        .robot-arm.right { 
          right: -15px;
          transform-origin: top left;
          transform: rotate(-20deg);
        }

        .robot-hand {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          background: #00eeff;
          border-radius: 50%;
          box-shadow: 0 0 10px #00eeff, inset 2px 2px 5px rgba(255,255,255,0.6);
        }

        /* Legs */
        .robot-leg {
          position: absolute;
          bottom: -15px;
          width: 25px;
          height: 25px;
          background: linear-gradient(to bottom, #ffffff, #cbd5e1);
          border-radius: 10px 10px 5px 5px;
          border-bottom: 4px solid #00eeff;
          box-shadow: 0 5px 10px rgba(0,238,255,0.4), inset -2px -2px 5px rgba(0,0,0,0.1);
        }
        .robot-leg.left { left: 15px; }
        .robot-leg.right { right: 15px; }

        @media (max-width: 768px) {
          .robot-container {
            transform: scale(0.65);
            transform-origin: bottom right;
          }
          .chatbot-wrapper {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  )
}
