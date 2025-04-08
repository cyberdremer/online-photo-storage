import { Button, Dialog, Portal, CloseButton, Alert } from "@chakra-ui/react";
import { useState } from "react";

const DeleteAlert = ({ deleteTitle, assetType, open, deleteAction }) => {
  return (
    <Dialog.Root role="alertdialog" open={open}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title> {deleteTitle} </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                This action cannot be undone, are you sure you would like to
                delete this {assetType}? This is permanent and cannot be undone!
              </p>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={deleteAction}>Delete</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const SuccessAlert = ({ message }) => {
  return (
    
      <Alert.Root status="success" variant="subtle">
        <Alert.Indicator />
        <Alert.Title>{message}</Alert.Title>
      </Alert.Root>
    
  );
};

const ErrorAlert = ({ message }) => {
  return (
    
      <Alert.Root status="error" variant="subtle">
        <Alert.Indicator />
        <Alert.Title>{message}</Alert.Title>
      </Alert.Root>
    
  );
};
export { DeleteAlert, SuccessAlert, ErrorAlert };
