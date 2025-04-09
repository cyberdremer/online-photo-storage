import { Box, CloseButton, Dialog, FileUpload, Portal } from "@chakra-ui/react";

const GenericModal = ({ isOpen, children, title, setOpen }) => {
  return (
    <Dialog.Root open={isOpen} motionPreset="slide-in-top" >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton onClick={() => setOpen(!isOpen)} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default GenericModal;
