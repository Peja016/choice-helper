"use client";

// src/containers/HomePage/IntroductionModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading,
  Box,
} from "@chakra-ui/react";

const steps: string[] = [
  "Enter Your Options – Type in the choices you can't decide between.",
  "Spin the Wheel – Tap the button and watch the wheel spin.",
  "Get Your Answer – Let the app pick one for you instantly.",
];

interface IntroductionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntroductionModal = ({ isOpen, onClose }: IntroductionModalProps) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="30em" width="90%" mx="auto">
        <ModalCloseButton />
        <ModalBody p="2em">
          <Heading textAlign="center">How to Use</Heading>
          <Box as="ol" mt="1em">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IntroductionModal;
