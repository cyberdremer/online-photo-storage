import ModeColors from "@/components/utils/modecolors";
import { Box, CloseButton, Dialog, FileUpload, Portal } from "@chakra-ui/react";

const GenericModal = ({ open, children, title, handleClose }) => {
  const{secondary, primary, buttonText, buttonBackground} = ModeColors();
  return (
    <Dialog.Root open={open} motionPreset="slide-in-top" >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content backgroundColor={primary}>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton onClick={handleClose} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default GenericModal;
