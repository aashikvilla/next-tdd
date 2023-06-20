import { CustomModalProps } from "@/app/components/CustomModal";
import { faker } from "@faker-js/faker";

export const mockCustomModalProps: CustomModalProps = {
    isOpen: true,
    closeModal: jest.fn(),
    header: faker.lorem.word(2),
    children: <div>{faker.lorem.sentence(1)}</div>,
  };