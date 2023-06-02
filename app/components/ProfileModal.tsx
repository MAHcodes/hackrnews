"use client";

import { FC } from "react";
import Modal from "@/app/components/Modal";

interface ProfileModalProps {
  profile: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ProfileModal: FC<ProfileModalProps> = ({
  profile,
  isOpen,
  setIsOpen,
}) => (
  <Modal title="User" isOpen={isOpen} setIsOpen={setIsOpen}>
    {profile.name}
  </Modal>
);

export default ProfileModal;
