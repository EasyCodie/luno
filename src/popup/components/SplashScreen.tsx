import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import styled from 'styled-components';

interface SplashScreenProps {
  onDismiss: () => void;
  autoPlay?: boolean;
}

const LOGO_SRC = '/icons/icons8-book-96.png';

const SplashContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 360px;
  padding: 48px 0;
  gap: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Logo = styled(motion.img)`
  width: 128px;
  height: 128px;
  filter: drop-shadow(0 4px 12px rgba(236, 223, 204, 0.15));
  user-select: none;
`;

const Tagline = styled(motion.p)`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  letter-spacing: 0.5px;
  margin: 0;
`;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const logoVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const taglineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.2,
      duration: 0.4,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export function SplashScreen({ onDismiss, autoPlay = true }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    const dismissTimer = setTimeout(() => {
      onDismiss();
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(dismissTimer);
    };
  }, [autoPlay, onDismiss]);

  return (
    <SplashContainer
      variants={containerVariants}
      initial="hidden"
      animate={isExiting ? 'exit' : 'visible'}
    >
      <Logo
        src={LOGO_SRC}
        alt="Luno"
        variants={logoVariants}
        initial="hidden"
        animate={isExiting ? 'exit' : 'visible'}
        draggable={false}
      />
      <Tagline
        variants={taglineVariants}
        initial="hidden"
        animate={isExiting ? 'exit' : 'visible'}
      >
        Define. Instantly.
      </Tagline>
    </SplashContainer>
  );
}
